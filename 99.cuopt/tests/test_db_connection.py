#!/usr/bin/env python3
"""
Database connection testing script for shelf optimization project.
Tests SQLAlchemy database connections and operations.
"""

import os
import sys
from datetime import datetime
from pathlib import Path

# Add parent directory to Python path to import modules
parent_dir = Path(__file__).parent.parent
sys.path.insert(0, str(parent_dir))

# Change working directory to parent so .env file can be found
os.chdir(parent_dir)

def test_sqlalchemy_connection():
    """Test SQLAlchemy database connection and operations"""
    print("🔧 Testing SQLAlchemy Connection...")
    
    try:
        from database import DatabaseManager, init_database
        
        # Test database initialization
        print("  ➤ Initializing database...")
        db_manager = init_database()
        print("  ✅ Database initialized successfully")
        
        # Test getting inventory
        print("  ➤ Testing inventory retrieval...")
        inventory_df = db_manager.get_inventory_df()
        print(f"  ✅ Retrieved {len(inventory_df)} inventory items")
        
        if not inventory_df.empty:
            print("  📋 Sample inventory items:")
            for _, item in inventory_df.head(3).iterrows():
                print(f"    - {item['name']} ({item['category']})")
        
        # Test getting shelves
        print("  ➤ Testing shelf retrieval...")
        shelf_dimensions = db_manager.get_shelves_dimensions()
        print(f"  ✅ Retrieved {len(shelf_dimensions)} shelves")
        
        if shelf_dimensions:
            print("  📋 Shelf dimensions:")
            for shelf_id, dims in shelf_dimensions.items():
                print(f"    - Shelf {shelf_id}: {dims['width']}x{dims['height']}x{dims['depth']}cm")
        
        # Test database session
        print("  ➤ Testing database session...")
        with db_manager.get_session() as session:
            from models import Inventory
            count = session.query(Inventory).count()
            print(f"  ✅ Session test passed - {count} inventory items in database")
        
        return True
        
    except ImportError as e:
        print(f"  ❌ Import error: {e}")
        print("  💡 Make sure dependencies are installed: pip install -r requirements.txt")
        return False
    except Exception as e:
        print(f"  ❌ SQLAlchemy connection failed: {e}")
        return False

def test_optimization_workflow():
    """Test complete optimization workflow"""
    print("\n🔧 Testing Optimization Workflow...")
    
    try:
        from shelf_optimizer import ShelfOptimizer
        from database import get_db_manager
        import pandas as pd
        
        db_manager = get_db_manager()
        
        # Test data loading
        print("  ➤ Loading optimization data...")
        inventory_df = db_manager.get_inventory_df()
        shelf_dimensions = db_manager.get_shelves_dimensions()
        
        if inventory_df.empty or not shelf_dimensions:
            print("  ⚠️  No sample data found - loading sample data...")
            db_manager.load_sample_data()
            inventory_df = db_manager.get_inventory_df()
            shelf_dimensions = db_manager.get_shelves_dimensions()
        
        print(f"  ✅ Loaded {len(inventory_df)} inventory items and {len(shelf_dimensions)} shelves")
        
        # Test optimizer initialization
        print("  ➤ Initializing optimizer...")
        optimizer = ShelfOptimizer(
            n_shelves=len(shelf_dimensions),
            shelf_dimensions=shelf_dimensions,
            products_df=inventory_df
        )
        print("  ✅ Optimizer initialized successfully")
        
        # Test data preparation (without running full optimization)
        print("  ➤ Testing data preparation...")
        locations_df = optimizer.prepare_optimization_data()
        print(f"  ✅ Prepared {len(locations_df)} locations for optimization")
        
        # Test cost matrix creation
        print("  ➤ Testing cost matrix creation...")
        cost_matrix = optimizer.create_cost_matrix()
        print(f"  ✅ Created {cost_matrix.shape} cost matrix")
        
        return True
        
    except ImportError as e:
        print(f"  ❌ Import error: {e}")
        print("  💡 Make sure cuOpt dependencies are installed")
        return False
    except Exception as e:
        print(f"  ❌ Optimization workflow test failed: {e}")
        return False

def test_environment_variables():
    """Test environment variable configuration"""
    print("\n🔧 Testing Environment Configuration...")
    
    # Check current working directory
    current_dir = os.getcwd()
    print(f"  📁 Working directory: {current_dir}")
    
    # Check for .env file in parent directory
    env_file = ".env"
    env_path = os.path.join(current_dir, env_file)
    if os.path.exists(env_path):
        print(f"  ✅ Found {env_file} at {env_path}")
        
        # Try to load .env file
        try:
            from dotenv import load_dotenv
            load_dotenv(env_path)
            print("  ✅ Loaded environment variables from .env")
        except ImportError:
            print("  ⚠️  python-dotenv not installed - using system environment variables")
        except Exception as e:
            print(f"  ⚠️  Could not load .env file: {e}")
    else:
        print(f"  ⚠️  No {env_file} found at {env_path} - using environment variables or defaults")
    
    # Check environment variables
    env_vars = [
        'DATABASE_URL',
        'DB_HOST', 
        'DB_PORT',
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD'
    ]
    
    print("  📋 Environment variables:")
    has_database_url = False
    has_individual_vars = True
    
    for var in env_vars:
        value = os.getenv(var)
        if var == 'DATABASE_URL' and value:
            has_database_url = True
            print(f"    ✅ {var}: ***configured***")  # Don't show actual URL
        elif var == 'DB_PASSWORD' and value:
            print(f"    ✅ {var}: ***hidden***")  # Don't show password
        elif value:
            print(f"    ✅ {var}: {value}")
            if var in ['DB_HOST', 'DB_NAME', 'DB_USER'] and not value:
                has_individual_vars = False
        else:
            print(f"    ❌ {var}: not set")
            if var in ['DB_HOST', 'DB_NAME', 'DB_USER']:
                has_individual_vars = False
    
    if has_database_url:
        print("  ✅ Using DATABASE_URL for connection")
        return True
    elif has_individual_vars:
        print("  ✅ Using individual DB_* variables for connection")
        return True
    else:
        print("  ❌ Missing required database configuration")
        print("  💡 Set DATABASE_URL or all DB_* variables in .env file")
        return False

def test_database_tables():
    """Test database tables and schema"""
    print("\n🔧 Testing Database Schema...")
    
    try:
        from database import get_db_manager
        from models import Base, Inventory, Shelf, InventoryPlacement, OptimizationRun
        
        db_manager = get_db_manager()
        
        # Test table creation
        print("  ➤ Creating tables...")
        db_manager.create_tables()
        print("  ✅ Tables created/verified successfully")
        
        # Test each model
        with db_manager.get_session() as session:
            models_to_test = [
                (Inventory, "inventory"),
                (Shelf, "shelves"), 
                (InventoryPlacement, "inventory_placements"),
                (OptimizationRun, "optimization_runs")
            ]
            
            print("  📋 Table counts:")
            for model, table_name in models_to_test:
                count = session.query(model).count()
                print(f"    - {table_name}: {count} records")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Schema test failed: {e}")
        return False

def print_connection_info():
    """Print connection information and tips"""
    print("\n📋 Connection Information:")
    print("="*50)
    
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        # Parse URL to show non-sensitive parts
        if database_url.startswith('postgresql://'):
            parts = database_url.replace('postgresql://', '').split('@')
            if len(parts) == 2:
                host_port_db = parts[1]
                print(f"Database: {host_port_db}")
        else:
            print("Database: Custom URL configured")
    else:
        host = os.getenv('DB_HOST', 'not set')
        port = os.getenv('DB_PORT', 'not set')
        database = os.getenv('DB_NAME', 'not set')
        print(f"Host: {host}")
        print(f"Port: {port}")
        print(f"Database: {database}")
    
    print("\n💡 Troubleshooting Tips:")
    print("- Ensure PostgreSQL is running and accessible")
    print("- Check .env file has correct database credentials")
    print("- Verify database exists and user has proper permissions")
    print("- Run 'pip install -r requirements.txt' to install dependencies")
    print("- Check cuOpt installation and CUDA compatibility")

def main():
    """Main test runner"""
    print("🧪 Database Connection Test Suite")
    print("="*50)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Test environment
    env_ok = test_environment_variables()
    
    if not env_ok:
        print("\n❌ Environment configuration failed - skipping connection tests")
        print_connection_info()
        return
    
    # Test SQLAlchemy
    sqlalchemy_ok = test_sqlalchemy_connection()
    
    # Test schema if SQLAlchemy works
    schema_ok = False
    if sqlalchemy_ok:
        schema_ok = test_database_tables()
    
    # Test optimization workflow
    workflow_ok = False
    if sqlalchemy_ok and schema_ok:
        workflow_ok = test_optimization_workflow()
    
    # Summary
    print("\n📊 Test Results Summary:")
    print("="*30)
    print(f"Environment Config: {'✅ PASS' if env_ok else '❌ FAIL'}")
    print(f"SQLAlchemy:         {'✅ PASS' if sqlalchemy_ok else '❌ FAIL'}")
    if sqlalchemy_ok:
        print(f"Database Schema:    {'✅ PASS' if schema_ok else '❌ FAIL'}")
    if schema_ok:
        print(f"Optimization Flow:  {'✅ PASS' if workflow_ok else '❌ FAIL'}")
    
    if sqlalchemy_ok and schema_ok and workflow_ok:
        print("\n🎉 All tests passed! Your system is ready for optimization.")
        print("You can now run the shelf optimization with: python main.py")
    else:
        print("\n⚠️  Some tests failed - check configuration and dependencies")
        print_connection_info()

if __name__ == "__main__":    
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user")
    except Exception as e:
        print(f"\n\n💥 Unexpected error: {e}")
        print("Please check your environment setup and try again")
        import traceback
        print("\nFull traceback:")
        traceback.print_exc()