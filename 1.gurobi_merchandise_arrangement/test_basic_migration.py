#!/usr/bin/env python3

import pandas as pd
from ortools_basic_solver import ORToolsBasicSolver
from shelf_configuration import ShelfConfiguration

def create_sample_data():
    """Create sample merchandise data for testing"""
    sample_data = {
        'product_id': [1, 2, 3, 4, 5],
        'name': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        'width': [10, 15, 8, 12, 20],
        'height': [20, 25, 15, 30, 35],
        'depth': [5, 8, 6, 7, 10],
        'weight': [100, 200, 80, 150, 300],
        'price': [10.0, 25.0, 8.0, 15.0, 50.0],
        'quantity': [10, 5, 20, 8, 3],
        'salesRate': [0.1, 0.2, 0.15, 0.08, 0.25],
        'isPromoted': [True, False, True, False, False]
    }
    return pd.DataFrame(sample_data)

def create_sample_shelves():
    """Create sample shelf configurations"""
    shelves = []
    for i in range(3):
        shelves.append(ShelfConfiguration(
            width=100,
            height=50,
            depth=50,
            weight=1000,
            gap=2,
            eye_level=(i == 1)  # Middle shelf is eye-level
        ))
    return shelves

def test_basic_migration():
    """Test the basic OR-Tools migration"""
    print("Testing basic OR-Tools migration from Gurobi...")

    # Create sample data
    merchandise = create_sample_data()
    shelves = create_sample_shelves()

    print(f"Sample merchandise items: {len(merchandise)}")
    print(f"Sample shelves: {len(shelves)}")

    # Create solver
    try:
        solver = ORToolsBasicSolver(None)
        print("✓ OR-Tools basic solver created successfully")

        # Setup model
        solver.setup_model(merchandise, shelves)
        print("✓ Model setup completed")

        # Optimize
        result = solver.optimize()
        print(f"✓ Optimization completed: {'Success' if result else 'Failed'}")

        if result:
            # Get solution
            solution = solver.get_solution()
            print(f"✓ Solution retrieved")

            # Print results
            print("\n=== BASIC MIGRATION RESULTS ===")
            print(f"Objective value: {solver.objective_value}")

            for shelf_id, items in solution.items():
                print(f"\nShelf {shelf_id} ({'Eye-level' if shelves[shelf_id].eye_level else 'Regular'}):")
                if items:
                    for item in items:
                        promoted = "★" if merchandise[merchandise['product_id'] == item['product_id']]['isPromoted'].iloc[0] else ""
                        print(f"  - {item['name']} {promoted} (${item['price']})")
                else:
                    print("  - Empty")

            print("\n=== BASIC MIGRATION TEST PASSED ===")
            return True
        else:
            print("❌ Optimization failed")
            return False

    except Exception as e:
        print(f"❌ Error during testing: {e}")
        return False

if __name__ == "__main__":
    success = test_basic_migration()
    exit(0 if success else 1)