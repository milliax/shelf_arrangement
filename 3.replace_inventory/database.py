import os
from sqlalchemy import create_engine, and_
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from models import Base
import pandas as pd
from typing import Optional
from typing import Dict, List, Any


class DatabaseManager:
    def __init__(self, database_url: Optional[str] = None):
        """
        Initialize database connection

        Args:
            database_url: PostgreSQL connection string. If None, uses environment variable
        """

        host = os.getenv('DB_HOST', 'localhost')
        port = os.getenv('DB_PORT', '5432')
        database = os.getenv('DB_NAME', 'shelf_optimizer')
        username = os.getenv('DB_USER', 'postgres')
        password = os.getenv('DB_PASSWORD', 'password')

        database_url = f"postgresql://{username}:{password}@{host}:{port}/{database}"

        print(f"Using provided database URL: {database_url}")

        self.engine = create_engine(
            database_url,
            # Enable SQL logging if DB_ECHO=true
            echo=os.getenv('DB_ECHO', 'false').lower() == 'true',
            pool_pre_ping=True,
            pool_recycle=300
        )

        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )

    # def create_tables(self):
    #     """Create all database tables"""
    #     Base.metadata.create_all(bind=self.engine)

    def get_session(self) -> Session:
        """Get a database session"""
        return self.SessionLocal()

    def get_selected_inventory(self, shelf_id: int, inventory_number: int) -> Dict[str, Any]:
        """
        Get selected inventory items for a given shelf

        Args:
            shelf_id: Shelf ID
            inventory_number: Number of inventory items to select

        Returns:
            Dictionary of selected inventory item with placement details
        """
        from models import Inventory, InventoryPlacement, Shelves

        with self.get_session() as session:
            results = session.query(Shelves).join(InventoryPlacement).join(Inventory).filter(
                Shelves.shelf_id == shelf_id
            ).order_by(InventoryPlacement.order).all()

            placement = results[0].placements[inventory_number-1]
            inventory = placement.inventory

            return {
                'placement_id': placement.id,
                'inventory_id': inventory.id,
                'order': placement.order,
                'name': inventory.name,
                'description': inventory.description,
                'quantity': inventory.quantity,
                'width': inventory.width,
                'height': inventory.height,
                'depth': inventory.depth,
                'price': inventory.price,
                'weight': inventory.weight,
                'isPromoted': inventory.isPromoted,
                'salesRate': inventory.salesRate,
                'createdAt': inventory.createdAt.isoformat() if inventory.createdAt else None,
                'updatedAt': inventory.updatedAt.isoformat() if inventory.updatedAt else None
            }
    def get_rest_inventories(self, shelf_id: int, inventory_number: int) -> pd.DataFrame:
        """
        Get the rest of the inventories not on the specified shelf

        Args:
            shelf_id: Shelf ID
            inventory_number: Number of inventory items on the shelf

        Returns:
            DataFrame of remaining inventory items
        """
        from models import Inventory, InventoryPlacement, Shelves

        with self.get_session() as session:
            # Subquery to get inventory IDs already placed on the shelf
            results = session.query(Inventory).filter(
                ~Inventory.id.in_(
                    session.query(InventoryPlacement.inventory_id).join(Shelves).filter(
                        Shelves.shelf_id == shelf_id
                    )
                )
            ).all()

            # Convert results to DataFrame
            inventory_list = [{
                'id': inv.id,
                'name': inv.name,
                'description': inv.description,
                'quantity': inv.quantity,
                'width': inv.width,
                'height': inv.height,
                'depth': inv.depth,
                'price': inv.price,
                'weight': inv.weight,
                'isPromoted': inv.isPromoted,
                'salesRate': inv.salesRate
            } for inv in results]

            return pd.DataFrame(inventory_list)

# Global database manager instance
db_manager = None


def get_db_manager() -> DatabaseManager:
    """Get or create database manager instance"""
    global db_manager
    if db_manager is None:
        db_manager = DatabaseManager()
    return db_manager


def init_database():
    """Initialize database connection without changing schema"""
    print("Initializing database connection...")
    db_mgr = get_db_manager()
    return db_mgr
