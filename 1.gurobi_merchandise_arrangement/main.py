from typing import List
import pandas as pd
from datetime import datetime
import uuid
from database import init_database, get_db_manager
from ortools_cpsat_solver import ORToolsCPSATSolver
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
        'height': 50,  # Example height in cm
        'depth': 50,  # Example length in cm
        'weight': 10000,  # Example max weight in g

        'eye_level': True,
    }

    print(f"Shelf dimensions: {shelf_dimensions}")
    # Create shelf configuration
    shelf_config = ShelfConfiguration(**shelf_dimensions)
    print(f"Shelf configuration: {shelf_config}")

    print(f"Number one shelf configuration: {shelf_config}")

    # shelves: List[ShelfConfiguration] = [ShelfConfiguration(
    #     'shelf_id': 'x',  # Generate shelf_id starting from 1
    #     'width': shelf_config.width,
    #     'height': shelf_config.height,
    #     'depth': shelf_config.depth,
    #     'weight': shelf_config.weight,
    #     'gap': 0.25,  # Default gap value
    #     'eye_level': (x == 1 or x == 2),  # Not available in ShelfConfiguration
    # ) for x in range(4)]
    shelves: List[ShelfConfiguration] = []
    # = [shelf_config for _ in range(4)]

    for i in range(4):
        shelves.append(ShelfConfiguration(
            width=shelf_config.width,
            height=shelf_config.height,
            depth=shelf_config.depth,
            weight=shelf_config.weight,
            gap=shelf_config.gap,
            eye_level=(i == 1 or i == 2),
        ))
        # shelves[i].isPromoted = (i == 0 or i == 1)

    # get maximize shelf dimension to filter products

    print(shelves)

    max_shelf_dimension = {
        "weight": max(shelf.weight for shelf in shelves),
        "width": max(shelf.width for shelf in shelves),
        "height": max(shelf.height for shelf in shelves),
        "depth": max(shelf.depth for shelf in shelves)
    }

    # Load data from database
    print("Loading inventory from database...")
    products_df = db_manager.get_inventories_with_constraints(dimension={
        "weight": max_shelf_dimension['weight'],
        "width": max_shelf_dimension['width'],
        "height": max_shelf_dimension['height'],
        "depth": max_shelf_dimension['depth']
    })

    # print(products_df)

    if products_df.empty:
        print("No inventory items found in database!")
        return

    print(f"Loaded {len(products_df)} inventory items")

    print(f"Number one fetched item: {products_df.iloc[0].to_dict()}")

    # Initialize optimizer with high-performance OR-Tools CP-SAT (multi-core)
    optimizer = ORToolsCPSATSolver(db_manager)
    optimizer.setup_model(products_df, shelves)

    # Optimize the arrangement
    print("Optimizing merchandise arrangement...")
    result = optimizer.optimize()

    # Get and print the solution
    if result:
        solution = optimizer.get_solution()
        print("solution")
        # print(solution)

        # Convert ShelfConfiguration objects to dictionaries for database storage
        shelves_data = []

        print("shelfes_data:")
        print(shelves)

        for i, shelf in enumerate(shelves):

            shelves_data.append({
                'shelf_id': i + 1,  # Generate shelf_id starting from 1
                'width': shelf.width,
                'height': shelf.height,
                'depth': shelf.depth,
                'weight': shelf.weight,
                'gap': 0.25,  # Default gap value

                'eye_level': shelf.eye_level,
            })

        # print(shelves_data)
        db_manager.save_shelves(shelves_data)

        # pylint: disable=some-error-code
        db_manager.save_optimization_results(solution, run_id=str(  # type: ignore
            uuid.uuid4()), total_objective=optimizer.objective_value)

    else:
        print("No optimal solution found.")


# Simplified approach that works with cuOpt's actual API
if __name__ == "__main__":
    main()
