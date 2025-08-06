import pandas as pd
from datetime import datetime
import uuid
from database import init_database, get_db_manager
from gurobi_solver import GurobiSolver
from shelf_configuration import ShelfConfiguration
from dotenv import load_dotenv

load_dotenv()  # take environment variables


def main():
    # Initialize database and load sample data
    print("Initializing database...")
    db_manager = init_database()

    # Generate shelf dimensions
    shelf_dimensions = {
        'width': 100,  # Example width in cm
        'height': 200,  # Example height in cm
        'depth': 50,  # Example length in cm
        'max_weight': 500  # Example max weight in kg
    }

    print(f"Shelf dimensions: {shelf_dimensions}")
    # Create shelf configuration
    shelf_config = ShelfConfiguration(**shelf_dimensions)
    print(f"Shelf configuration: {shelf_config}")

    shelves = [shelf_config for _ in range(3)]

    # get minimum dimension of shelves

    min_shelf_dimension = {
        'width': min(shelf.width for shelf in shelves),
        'height': min(shelf.height for shelf in shelves),
        'depth': min(shelf.depth for shelf in shelves),
        'max_weight': min(shelf.max_weight for shelf in shelves)
    }

    print(f"Minimum shelf dimension: {min_shelf_dimension}")

    # Load data from database
    print("Loading inventory from database...")
    products_df = db_manager.get_inventories_with_constraints(dimension={
        "weight": min_shelf_dimension['max_weight'],

        "width": min_shelf_dimension['width'],
        "height": min_shelf_dimension['height'],
        "depth": min_shelf_dimension['depth']
    })

    if products_df.empty:
        print("No inventory items found in database!")
        return

    print(f"Loaded {len(products_df)} inventory items")

    print(f"Number one fetched item: {products_df.iloc[0].to_dict()}")

    # Initialize optimizer with gurobi
    optimizer = GurobiSolver(db_manager)
    optimizer.setup_model(products_df, shelf_dimensions)

    # Optimize the arrangement
    print("Optimizing merchandise arrangement...")
    optimizer.optimize()

    # Get and print the solution
    solution = optimizer.get_solution()


# Simplified approach that works with cuOpt's actual API
if __name__ == "__main__":
    main()
