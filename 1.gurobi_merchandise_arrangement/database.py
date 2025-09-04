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

            print(
                f"Found {number_to_be_placed} inventory items matching constraints")

            if not inventory_items:
                return pd.DataFrame()

            data = []
            for item in inventory_items:
                # process constraints if available

                data.append({
                    'product_id': str(item.id),
                    'name': item.name,
                    'description': item.description,
                    'width': item.width,
                    'depth': item.depth,
                    'height': item.height,
                    'weight': item.weight,
                    'price': item.price,
                    'quantity': item.quantity,
                })

            return pd.DataFrame(data)

    def get_shelves_dimensions(self) -> dict:
        """
        Get shelf dimensions as dictionary for optimization
        """
        with self.get_session() as session:
            from models import Shelves


            shelves = session.query(Shelves).all()

            shelf_dimensions = {}
            for shelf in shelves:
                shelf_dimensions[shelf.shelf_id] = {
                    'width': shelf.width,
                    'height': shelf.height,
                    'depth': shelf.depth,
                    'eye_level': shelf.eye_level,
                    # 'position_x': shelf.position_x,
                    # 'position_y': shelf.position_y
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

        print("Saving optimization results...")

        with self.get_session() as session:
            from models import InventoryPlacement, OptimizationRun, Inventory, Shelves

            # Create optimization run record
            opt_run = OptimizationRun(
                run_id=run_id,
                status='completed',
                total_objective=total_objective
            )
            session.add(opt_run)

            # Clear existing placements (no run_id reference in schema)
            session.query(InventoryPlacement).delete()

            print("Deleted existing inventory placements")

            # Save new placements
            # for _, row in results_df.iterrows():

            # get all shelves

            shelves_dict = {
                shelf.shelf_id: shelf for shelf in session.query(Shelves).all()}

            shelves = list(shelves_dict.values())

            # print(shelves)

            # clear all placements

            for key, merchandises in results_df.items():
                # print(key)

                for m in merchandises:
                    inventory_id = int(m['product_id'])
                    shelf = shelves[int(key)] # type: ignore

                    shelf_id = shelf.id

                    # print(shelf_id, inventory_id)

                    # Verify inventory and shelf exist
                    inventory = session.query(Inventory).filter(
                        Inventory.id == inventory_id).first()
                    
                    if not inventory :
                        print(inventory)
                        print(
                            f"Skipping placement: Inventory {inventory_id} not found")
                        continue

                    placement = InventoryPlacement(
                        inventoryId=inventory_id,
                        shelfId=shelf_id
                    )
                    session.add(placement)

            session.commit()

    def save_shelves(self, shelves_data):
        """
        Save shelves data to database

        Args:
            shelves_data: List of shelf dictionaries with shelf_id, dimensions, and positions
        """

        with self.get_session() as session:
            from models import Shelves, InventoryPlacement
            # delete existing shelves

            session.query(InventoryPlacement).delete()
            session.query(Shelves).delete()
            print("Deleted existing shelves")

            # Save shelf configurations
            for shelf_data in shelves_data:
                shelf = Shelves(
                    shelf_id=shelf_data['shelf_id'],
                    width=shelf_data['width'],
                    height=shelf_data['height'],
                    depth=shelf_data['depth'],
                    weight=shelf_data['weight'],
                    eye_level=shelf_data.get('eye_level'),
                )

                session.add(shelf)

            session.commit()
            print(f"Saved {len(shelves_data)} shelves to database")

    def load_sample_data(self):
        """
        Load sample data for testing
        """
        with self.get_session() as session:
            from models import Inventory, Shelves

            # Check if data already exists
            print("Checking for existing sample data...")
            if session.query(Inventory).count() > 0:
                print("Sample data already exists")
                return

            # Sample shelves
            print("Loading sample shelves...")

            if session.query(Shelves).count() == 0:
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
