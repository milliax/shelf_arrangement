#!/usr/bin/env python3

import pandas as pd
import random
from ortools_solver import ORToolsSolver
from shelf_configuration import ShelfConfiguration

def create_large_sample_data(num_items=50):
    """Create a larger sample with more items for a longer solve time"""
    random.seed(42)  # For reproducible results

    sample_data = {
        'product_id': list(range(1, num_items + 1)),
        'name': [f'Product {chr(65 + i % 26)}{i//26 + 1}' for i in range(num_items)],
        'width': [random.randint(5, 25) for _ in range(num_items)],
        'height': [random.randint(10, 40) for _ in range(num_items)],
        'depth': [random.randint(3, 15) for _ in range(num_items)],
        'weight': [random.randint(50, 500) for _ in range(num_items)],
        'price': [round(random.uniform(5.0, 100.0), 2) for _ in range(num_items)],
        'quantity': [random.randint(1, 20) for _ in range(num_items)],
        'salesRate': [round(random.uniform(0.05, 0.3), 3) for _ in range(num_items)],
        'isPromoted': [random.choice([True, False]) for _ in range(num_items)]
    }
    return pd.DataFrame(sample_data)

def create_complex_shelves(num_shelves=8):
    """Create more shelves with varying constraints"""
    shelves = []
    for i in range(num_shelves):
        # Vary shelf sizes to make the problem more complex
        width = 80 + (i % 3) * 20  # 80, 100, or 120
        height = 30 + (i % 4) * 10  # 30, 40, 50, or 60
        depth = 25 + (i % 2) * 15   # 25 or 40
        weight = 800 + (i % 3) * 200  # 800, 1000, or 1200

        shelves.append(ShelfConfiguration(
            width=width,
            height=height,
            depth=depth,
            weight=weight,
            gap=random.uniform(1, 3),
            eye_level=(i in [2, 3, 4])  # Multiple eye-level shelves
        ))
    return shelves

def test_progress_display():
    """Test the progress display with a larger, more complex problem"""
    print("Testing OR-Tools solver with progress display...")
    print("Creating larger problem for better progress visualization...")

    # Create larger sample data
    merchandise = create_large_sample_data(50)
    shelves = create_complex_shelves(8)

    print(f"Problem size: {len(merchandise)} items, {len(shelves)} shelves")
    print(f"Promoted items: {sum(merchandise['isPromoted'])}")
    print(f"Eye-level shelves: {sum(1 for s in shelves if s.eye_level)}")

    # Create solver
    try:
        solver = ORToolsSolver(None)
        print("✓ OR-Tools solver created successfully")

        # Setup model - this might take a moment with larger problem
        print("Setting up optimization model...")
        solver.setup_model(merchandise, shelves)
        print("✓ Model setup completed")

        # Optimize with progress display
        result = solver.optimize()

        if result:
            # Get solution
            solution = solver.get_solution()
            print(f"\n✓ Solution retrieved")

            # Print summary results
            print("\n=== OPTIMIZATION SUMMARY ===")
            print(f"Objective value: {solver.objective_value}")

            total_items_placed = sum(len(items) for items in solution.values())
            print(f"Items placed: {total_items_placed}/{len(merchandise)}")

            for shelf_id, items in solution.items():
                shelf_type = "Eye-level" if shelves[shelf_id].eye_level else "Regular"
                promoted_count = sum(1 for item in items
                                   if merchandise[merchandise['product_id'] == item['product_id']]['isPromoted'].iloc[0])
                print(f"Shelf {shelf_id} ({shelf_type}): {len(items)} items ({promoted_count} promoted)")

            print("\n=== PROGRESS DISPLAY TEST PASSED ===")
            return True
        else:
            print("❌ Optimization failed")
            return False

    except Exception as e:
        print(f"❌ Error during testing: {e}")
        return False

if __name__ == "__main__":
    success = test_progress_display()
    exit(0 if success else 1)