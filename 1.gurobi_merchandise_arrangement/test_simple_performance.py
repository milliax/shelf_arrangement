#!/usr/bin/env python3

import pandas as pd
import psutil
from ortools_cpsat_solver import ORToolsCPSATSolver
from shelf_configuration import ShelfConfiguration

def test_simple_performance():
    """Test the high-performance solver with a simple, feasible problem"""
    print("🚀 TESTING HIGH-PERFORMANCE CP-SAT SOLVER (Simple Case)")
    print("=" * 60)

    # Show system resources
    cpu_count = psutil.cpu_count(logical=True)
    memory = psutil.virtual_memory()
    print(f"🧠 CPU Cores: {cpu_count}")
    print(f"💾 RAM: {memory.total / (1024**3):.1f} GB ({memory.percent}% used)")

    # Create simple, feasible data
    sample_data = {
        'product_id': [1, 2, 3, 4, 5],
        'name': ['Small A', 'Small B', 'Small C', 'Medium D', 'Large E'],
        'width': [10, 15, 8, 20, 25],     # Small widths
        'height': [15, 20, 12, 25, 30],   # Small heights
        'depth': [5, 8, 6, 10, 12],       # Small depths
        'weight': [100, 200, 80, 300, 400], # Light weights
        'price': [10.0, 25.0, 8.0, 15.0, 50.0],
        'quantity': [10, 5, 20, 8, 3],
        'salesRate': [0.1, 0.2, 0.15, 0.08, 0.25],
        'isPromoted': [True, False, True, False, False]
    }
    merchandise = pd.DataFrame(sample_data)

    # Create large, accommodating shelves
    shelves = []
    for i in range(3):
        shelves.append(ShelfConfiguration(
            width=150,    # Large width
            height=60,    # Large height
            depth=80,     # Large depth
            weight=2000,  # Large weight capacity
            gap=2,
            eye_level=(i == 1)
        ))

    print(f"📦 Problem: {len(merchandise)} items × {len(shelves)} shelves")
    print(f"⭐ Promoted items: {sum(merchandise['isPromoted'])}")

    try:
        # Monitor CPU before
        cpu_before = psutil.cpu_percent(interval=1)

        # Create solver
        solver = ORToolsCPSATSolver(None)
        print("✅ High-performance CP-SAT solver created")

        # Setup model
        solver.setup_model(merchandise, shelves)

        # Optimize
        result = solver.optimize()

        # Monitor CPU after
        cpu_after = psutil.cpu_percent(interval=1)

        if result:
            solution = solver.get_solution()
            stats = solver.get_performance_stats()

            print("\n🏆 RESULTS")
            print("=" * 30)
            print(f"🎯 Objective: {solver.objective_value}")
            print(f"⚡ Time: {stats['wall_time']:.3f}s")
            print(f"🌳 Branches: {stats['branches']:,}")
            print(f"🔧 CPU Before: {cpu_before:.1f}%")
            print(f"🔧 CPU After: {cpu_after:.1f}%")

            # Show solution
            total_placed = sum(len(items) for items in solution.values())
            print(f"📊 Items placed: {total_placed}/{len(merchandise)}")

            for shelf_id, items in solution.items():
                shelf_type = "👁️ Eye-level" if shelves[shelf_id].eye_level else "📋 Regular"
                if items:
                    promoted = sum(1 for item in items if merchandise[merchandise['product_id'] == item['product_id']]['isPromoted'].iloc[0])
                    print(f"{shelf_type} Shelf {shelf_id}: {len(items)} items ({promoted}⭐)")
                    for item in items:
                        print(f"  - {item['name']} (${item['price']})")
                else:
                    print(f"{shelf_type} Shelf {shelf_id}: Empty")

            print("\n🎉 PERFORMANCE TEST PASSED! 🎉")
            print(f"✨ Used {cpu_count} CPU cores effectively!")
            return True
        else:
            print("❌ Optimization failed")
            return False

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_simple_performance()
    exit(0 if success else 1)