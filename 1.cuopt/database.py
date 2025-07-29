import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool
from models import Base
import pandas as pd
from typing import Optional

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
        
        self.engine = create_engine(
            database_url,
            echo=os.getenv('DB_ECHO', 'false').lower() == 'true',  # Enable SQL logging if DB_ECHO=true
            pool_pre_ping=True,
            pool_recycle=300
        )
        
        self.SessionLocal = sessionmaker(
            autocommit=False,
            autoflush=False,
            bind=self.engine
        )
    
    def create_tables(self):
        """Create all database tables"""
        Base.metadata.create_all(bind=self.engine)
    
    def get_session(self) -> Session:
        """Get a database session"""
        return self.SessionLocal()
    
    def get_products_df(self) -> pd.DataFrame:
        """
        Get all products as pandas DataFrame for optimization
        """
        with self.get_session() as session:
            from models import Product
            
            products = session.query(Product).all()
            
            if not products:
                return pd.DataFrame()
            
            data = []
            for product in products:
                data.append({
                    'product_id': product.product_id,
                    'name': product.name,
                    'category': product.category,
                    'width': product.width,
                    'depth': product.depth,
                    'height': product.height,
                    'margin': product.margin,
                    'sales_frequency': product.sales_frequency
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
            from models import ProductPlacement, OptimizationRun, Product, Shelf
            
            # Create optimization run record
            opt_run = OptimizationRun(
                run_id=run_id,
                status='completed',
                total_objective=total_objective
            )
            session.add(opt_run)
            
            # Clear existing placements for this run (if any)
            session.query(ProductPlacement).filter(
                ProductPlacement.optimization_run_id == run_id
            ).delete()
            
            # Save new placements
            for _, row in results_df.iterrows():
                # Get product and shelf database IDs
                product = session.query(Product).filter(
                    Product.product_id == row['product_id']
                ).first()
                
                shelf = session.query(Shelf).filter(
                    Shelf.shelf_id == row['shelf_id']
                ).first()
                
                if product and shelf:
                    placement = ProductPlacement(
                        product_id=product.id,
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
            from models import Product, Shelf
            
            # Check if data already exists
            if session.query(Product).count() > 0:
                print("Sample data already exists")
                return
            
            # Sample products
            products_data = [
                {'product_id': 'P001', 'name': 'Cereal A', 'category': 'cereal', 'width': 30, 'depth': 20, 'height': 40, 'margin': 0.3, 'sales_frequency': 0.8},
                {'product_id': 'P002', 'name': 'Cereal B', 'category': 'cereal', 'width': 25, 'depth': 20, 'height': 35, 'margin': 0.35, 'sales_frequency': 0.7},
                {'product_id': 'P003', 'name': 'Milk', 'category': 'dairy', 'width': 15, 'depth': 30, 'height': 25, 'margin': 0.2, 'sales_frequency': 0.9},
                {'product_id': 'P004', 'name': 'Yogurt', 'category': 'dairy', 'width': 10, 'depth': 15, 'height': 15, 'margin': 0.25, 'sales_frequency': 0.6},
                {'product_id': 'P005', 'name': 'Bread', 'category': 'bakery', 'width': 40, 'depth': 30, 'height': 15, 'margin': 0.15, 'sales_frequency': 0.95},
                {'product_id': 'P006', 'name': 'Chips', 'category': 'snacks', 'width': 20, 'depth': 25, 'height': 30, 'margin': 0.4, 'sales_frequency': 0.7},
                {'product_id': 'P007', 'name': 'Soda', 'category': 'beverages', 'width': 15, 'depth': 30, 'height': 35, 'margin': 0.5, 'sales_frequency': 0.8},
                {'product_id': 'P008', 'name': 'Water', 'category': 'beverages', 'width': 20, 'depth': 30, 'height': 35, 'margin': 0.1, 'sales_frequency': 0.85},
            ]
            
            for product_data in products_data:
                product = Product(**product_data)
                session.add(product)
            
            # Sample shelves
            shelves_data = [
                {'shelf_id': 0, 'width': 200, 'height': 50, 'depth': 50, 'eye_level': 0, 'position_x': 0, 'position_y': 100},  # Top shelf
                {'shelf_id': 1, 'width': 200, 'height': 50, 'depth': 50, 'eye_level': 1, 'position_x': 100, 'position_y': 100},  # Eye level
                {'shelf_id': 2, 'width': 200, 'height': 50, 'depth': 50, 'eye_level': 0, 'position_x': 200, 'position_y': 100},  # Bottom shelf
            ]
            
            for shelf_data in shelves_data:
                shelf = Shelf(**shelf_data)
                session.add(shelf)
            
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
    """Initialize database with tables and sample data"""
    db_mgr = get_db_manager()
    db_mgr.create_tables()
    db_mgr.load_sample_data()
    return db_mgr