#!/usr/bin/env python3

import pandas as pd
import random
import psutil
from ortools_cpsat_solver import ORToolsCPSATSolver
from shelf_configuration import ShelfConfiguration

def show_system_resources():
    """Display system resources for optimization"""
    cpu_count = psutil.cpu_count(logical=True)
    cpu_count_physical = psutil.cpu_count(logical=False)
    memory = psutil.virtual_memory()

    print("🖥️  SYSTEM RESOURCES")
    print("=" * 40)
    print(f"🧠 CPU Cores (Logical): {cpu_count}")
    print(f"🔧 CPU Cores (Physical): {cpu_count_physical}")
    print(f"💾 RAM Total: {memory.total / (1024**3):.1f} GB")
    print(f"💾 RAM Available: {memory.available / (1024**3):.1f} GB")
    print(f"📊 RAM Usage: {memory.percent}%")
    print("=" * 40)

def create_complex_sample_data(num_items=100):
    """Create a complex sample with many items for performance testing"""
    random.seed(42)

    sample_data = {
        'product_id': list(range(1, num_items + 1)),
        'name': [f'Product {chr(65 + i % 26)}{i//26 + 1}' for i in range(num_items)],
        'width': [random.randint(5, 30) for _ in range(num_items)],
        'height': [random.randint(10, 50) for _ in range(num_items)],
        'depth': [random.randint(3, 20) for _ in range(num_items)],
        'weight': [random.randint(50, 800) for _ in range(num_items)],
        'price': [round(random.uniform(5.0, 150.0), 2) for _ in range(num_items)],
        'quantity': [random.randint(1, 25) for _ in range(num_items)],
        'salesRate': [round(random.uniform(0.05, 0.4), 3) for _ in range(num_items)],
        'isPromoted': [random.choice([True, False]) for _ in range(num_items)]
    }
    return pd.DataFrame(sample_data)

def create_diverse_shelves(num_shelves=12):
    """Create diverse shelves with varying constraints"""
    shelves = []
    for i in range(num_shelves):
        # Create more diverse shelf configurations
        width = 60 + (i % 5) * 25  # 60, 85, 110, 135, 160
        height = 25 + (i % 6) * 8   # 25, 33, 41, 49, 57, 65
        depth = 20 + (i % 4) * 12   # 20, 32, 44, 56
        weight = 600 + (i % 4) * 300  # 600, 900, 1200, 1500

        shelves.append(ShelfConfiguration(
            width=width,
            height=height,
            depth=depth,
            weight=weight,
            gap=random.uniform(0.5, 4.0),
            eye_level=(i in [3, 4, 5, 6])  # Multiple eye-level shelves
        ))
    return shelves

def test_high_performance():
    """Test the high-performance CP-SAT solver"""
    print("🚀 TESTING HIGH-PERFORMANCE OR-TOOLS CP-SAT SOLVER")
    print("=" * 60)

    # Show system resources
    show_system_resources()

    # Create complex problem
    print("🏗️  Creating complex optimization problem...")
    merchandise = create_complex_sample_data(100)
    shelves = create_diverse_shelves(12)

    print(f"📦 Problem size: {len(merchandise)} items × {len(shelves)} shelves")
    print(f"⭐ Promoted items: {sum(merchandise['isPromoted'])}")
    print(f"👁️  Eye-level shelves: {sum(1 for s in shelves if s.eye_level)}")
    print(f"🧮 Total variables: {len(merchandise) * len(shelves) + len(merchandise)} binary variables")

    # Monitor CPU usage before optimization
    cpu_before = psutil.cpu_percent(interval=1)
    memory_before = psutil.virtual_memory().percent

    try:
        # Create high-performance solver
        solver = ORToolsCPSATSolver(None)
        print("✅ High-performance CP-SAT solver created")

        # Setup model
        print("🔧 Setting up optimization model...")
        solver.setup_model(merchandise, shelves)

        # Monitor CPU during setup
        cpu_during_setup = psutil.cpu_percent(interval=0.1)

        # Optimize with all cores
        print("🚀 Starting multi-core optimization...")
        result = solver.optimize()

        # Monitor CPU after optimization
        cpu_after = psutil.cpu_percent(interval=1)
        memory_after = psutil.virtual_memory().percent

        if result:
            # Get solution and performance stats
            solution = solver.get_solution()
            stats = solver.get_performance_stats()

            print("\n" + "="*60)
            print("🏆 OPTIMIZATION RESULTS")
            print("="*60)
            print(f"🎯 Objective value: {solver.objective_value}")
            print(f"⚡ Wall time: {stats['wall_time']:.3f}s")
            print(f"🧠 User time: {stats['user_time']:.3f}s")
            print(f"🌳 Branches explored: {stats['branches']:,}")
            print(f"💥 Conflicts: {stats['conflicts']:,}")

            # CPU utilization analysis
            print("\n💻 RESOURCE UTILIZATION")
            print("="*30)
            print(f"🔧 CPU Before: {cpu_before:.1f}%")
            print(f"🔧 CPU During Setup: {cpu_during_setup:.1f}%")
            print(f"🔧 CPU After: {cpu_after:.1f}%")
            print(f"💾 Memory Before: {memory_before:.1f}%")
            print(f"💾 Memory After: {memory_after:.1f}%")

            # Solution summary
            total_items_placed = sum(len(items) for items in solution.values())
            print(f"\n📊 SOLUTION SUMMARY")
            print("="*30)
            print(f"📦 Items placed: {total_items_placed}/{len(merchandise)} ({total_items_placed/len(merchandise)*100:.1f}%)")

            # Shelf utilization
            for shelf_id, items in solution.items():
                if items:  # Only show non-empty shelves
                    shelf_type = "👁️ Eye-level" if shelves[shelf_id].eye_level else "📋 Regular"
                    promoted_count = sum(1 for item in items
                                       if merchandise[merchandise['product_id'] == item['product_id']]['isPromoted'].iloc[0])
                    total_weight = sum(item['weight'] for item in items)
                    total_width = sum(item['width'] for item in items)
                    print(f"{shelf_type} Shelf {shelf_id}: {len(items)} items ({promoted_count}⭐) - {total_weight}g, {total_width}cm")

            print("\n🎉 HIGH-PERFORMANCE TEST PASSED! 🎉")
            return True
        else:
            print("❌ Optimization failed")
            return False

    except Exception as e:
        print(f"❌ Error during testing: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_high_performance()
    exit(0 if success else 1)