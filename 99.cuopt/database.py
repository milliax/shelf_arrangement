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
        if database_url is None:
            # Try to get from environment variables
            database_url = os.getenv('DATABASE_URL')

            # If not found, construct from individual components
            if database_url is None:
                host = os.getenv('DB_HOST', 'localhost')
                port = os.getenv('DB_PORT', '5432')
                database = os.getenv('DB_NAME', 'shelf_optimizer')
                username = os.getenv('DB_USER', 'postgres')
                password = os.getenv('DB_PASSWORD', 'password')

                database_url = f"postgresql://{username}:{password}@{host}:{port}/{database}"

                print(f"Using constructed database URL: {database_url}")

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

    def get_inventory_df(self) -> pd.DataFrame:
        """
        Get all inventory items as pandas DataFrame for optimization
        """
        with self.get_session() as session:
            from models import Inventory

            inventory_items = session.query(Inventory).all()

            if not inventory_items:
                return pd.DataFrame()

            data = []
            for item in inventory_items:
                data.append({
                    # Use id as product_id since that's what we had before
                    'product_id': str(item.id),
                    'name': item.name,
                    'category': item.description,  # Use description as category for now
                    'width': item.width,
                    'depth': item.depth,
                    'height': item.height,
                    'margin': 0.25,  # Default margin since not in schema
                    'sales_frequency': 0.5  # Default sales frequency since not in schema
                })

            return pd.DataFrame(data)

    def get_inventories_with_constraints(self, dimension: Dict[str, float]) -> pd.DataFrame:
        """
        Get inventory items with constraints as pandas DataFrame for optimization
        """
        with self.get_session() as session:
            from models import Inventory

            inventory_items_query = session.query(Inventory)\
                .filter(and_(
                    Inventory.weight < dimension["weight"],
                    Inventory.width <= dimension["width"],
                    Inventory.height <= dimension["height"],
                    Inventory.depth <= dimension["depth"]
                ))
            
            number_to_be_placed = inventory_items_query.count()
            inventory_items = inventory_items_query.all()
            
            if number_to_be_placed == 0:
                print("No inventory items match the constraints")
                return pd.DataFrame()
            
            print(f"Found {number_to_be_placed} inventory items matching constraints")

            if not inventory_items:
                return pd.DataFrame()

            data = []
            for item in inventory_items:
                # process constraints if available

                data.append({
                    'product_id': str(item.id),
                    'name': item.name,
                    'category': item.description,
                    'width': item.width,
                    'depth': item.depth,
                    'height': item.height,
                    'margin': 0.25,  # Default margin since not in schema
                    'sales_frequency': 0.5,  # Default sales frequency since not in schema
                    # Safe access since constraints not in model
                    'constraints': getattr(item, 'constraints', '')
                })

            return pd.DataFrame(data)

    def get_shelves_dimensions(self) -> dict:
        """
        Get shelf dimensions as dictionary for optimization
        """
        with self.get_session() as session:
            from models import Shelf

            shelves = session.query(Shelf).all()

            shelf_dimensions = {}
            for shelf in shelves:
                shelf_dimensions[shelf.shelf_id] = {
                    'width': shelf.width,
                    'height': shelf.height,
                    'depth': shelf.depth,
                    'eye_level': shelf.eye_level,
                    'position_x': shelf.position_x,
                    'position_y': shelf.position_y
                }

            return shelf_dimensions

    def save_optimization_results(self, results_df: pd.DataFrame, run_id: str, total_objective: Optional[float] = None):
        """
        Save optimization results to database

        Args:
            results_df: DataFrame with optimization results
            run_id: Unique identifier for this optimization run
            total_objective: Total objective value from optimization
        """
        with self.get_session() as session:
            from models import InventoryPlacement, OptimizationRun, Inventory, Shelf

            # Create optimization run record
            opt_run = OptimizationRun(
                run_id=run_id,
                status='completed',
                total_objective=total_objective
            )
            session.add(opt_run)

            # Clear existing placements for this run (if any)
            session.query(InventoryPlacement).filter(
                InventoryPlacement.optimization_run_id == run_id
            ).delete()

            # Save new placements
            for _, row in results_df.iterrows():
                # Get inventory item and shelf database IDs
                inventory_item = session.query(Inventory).filter(
                    Inventory.id == int(row['product_id'])
                ).first()

                shelf = session.query(Shelf).filter(
                    Shelf.shelf_id == row['shelf_id']
                ).first()

                if inventory_item and shelf:
                    placement = InventoryPlacement(
                        inventory_id=inventory_item.id,
                        shelf_id=shelf.id,
                        slot_id=row['slot_id'],
                        placement_score=row.get('placement_score'),
                        optimization_run_id=run_id
                    )
                    session.add(placement)

            session.commit()

    def load_sample_data(self):
        """
        Load sample data for testing
        """
        with self.get_session() as session:
            from models import Inventory, Shelf

            # Check if data already exists
            print("Checking for existing sample data...")
            if session.query(Inventory).count() > 0:
                print("Sample data already exists")
                return

            # Sample shelves
            print("Loading sample shelves...")

            if session.query(Shelf).count() == 0:
                print("No shelves found")

            session.commit()
            print("Sample data loaded successfully")


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
