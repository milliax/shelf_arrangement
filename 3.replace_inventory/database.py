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

    def get_rest_inventories(self, exclude_shelf_id: Optional[int] = None) -> pd.DataFrame:
        """
        Get the rest of the inventories not on any shelf, or not on a specific shelf

        Args:
            exclude_shelf_id: Optional shelf ID to exclude from results

        Returns:
            DataFrame of remaining inventory items
        """
        from models import Inventory, InventoryPlacement, Shelves

        with self.get_session() as session:
            query = session.query(Inventory)

            if exclude_shelf_id is not None:
                # Get inventory IDs already placed on the specified shelf
                placed_subquery = session.query(InventoryPlacement.inventoryId).join(
                    Shelves, InventoryPlacement.shelfId == Shelves.id
                ).filter(Shelves.shelf_id == exclude_shelf_id)

                query = query.filter(~Inventory.id.in_(placed_subquery))
            else:
                # Get all inventory not placed on any shelf
                placed_subquery = session.query(InventoryPlacement.inventoryId)
                query = query.filter(~Inventory.id.in_(placed_subquery))

            results = query.all()

            # Convert results to DataFrame
            inventory_list = [{
                'product_id': inv.id,  # Use product_id for compatibility with solver
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

    def replace_inventory_on_shelf(self, placement_id: str, new_inventory_id: int) -> bool:
        """
        Replace an inventory item on a shelf with a new inventory item

        Args:
            placement_id: ID of the placement to replace
            new_inventory_id: ID of the new inventory item

        Returns:
            Boolean indicating success
        """
        from models import InventoryPlacement

        print(
            f"Replacing placement {placement_id} with inventory {new_inventory_id}")

        with self.get_session() as session:
            try:
                # Get the existing placement
                placement = session.query(InventoryPlacement).filter(
                    InventoryPlacement.id == placement_id
                ).first()

                if not placement:
                    print(f"Placement with ID {placement_id} not found")
                    return False

                # Update the inventory ID
                placement.inventoryId = new_inventory_id

                # Commit the changes
                session.commit()
                print(
                    f"Successfully replaced inventory in placement {placement_id} with inventory {new_inventory_id}")
                return True

            except Exception as e:
                print(f"Error replacing inventory: {e}")
                session.rollback()
                return False

    def get_shelf_info(self, shelf_id: int) -> Optional[Dict[str, Any]]:
        """
        Get shelf information including dimensions and constraints

        Args:
            shelf_id: Shelf ID

        Returns:
            Dictionary containing shelf information or None if not found
        """
        from models import Shelves

        with self.get_session() as session:
            shelf = session.query(Shelves).filter(
                Shelves.shelf_id == shelf_id).first()

            if not shelf:
                return None

            return {
                'id': shelf.id,
                'shelf_id': shelf.shelf_id,
                'width': shelf.width,
                'height': shelf.height,
                'depth': shelf.depth,
                'weight': shelf.weight,
                'eye_level': shelf.eye_level,
                'gap': 0.25  # Default gap value from models
            }

    def get_inventories_on_shelf(self, shelf_id):
        # get inventories on shelf_id

        from models import Shelves, InventoryPlacement, Inventory

        with self.get_session() as session:
            shelf = session.query(Shelves).filter(
                Shelves.shelf_id == shelf_id
            ).join(InventoryPlacement).join(Inventory).all()

            if not shelf:
                return pd.DataFrame()

            inventory_list = []
            for sh in shelf:
                for placement in sh.placements:
                    inv = placement.inventory
                    inventory_list.append({
                        'product_id': inv.id,
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
                    })
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
