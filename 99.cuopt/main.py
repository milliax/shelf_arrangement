import pandas as pd
from datetime import datetime
import uuid
from shelf_optimizer import ShelfOptimizer
from database import init_database, get_db_manager

def main():
    # Initialize database and load sample data
    print("Initializing database...")
    db_manager = init_database()
    
    # Load data from database
    print("Loading inventory from database...")
    products_df = db_manager.get_inventory_df()
    
    if products_df.empty:
        print("No inventory items found in database!")
        return
    
    print(f"Loaded {len(products_df)} inventory items")
    
    print("Loading shelf dimensions from database...")
    shelf_dimensions = db_manager.get_shelves_dimensions()
    
    if not shelf_dimensions:
        print("No shelves found in database!")
        return
    
    print(f"Loaded {len(shelf_dimensions)} shelves")
    
    # Initialize optimizer
    optimizer = ShelfOptimizer(
        n_shelves=len(shelf_dimensions),
        shelf_dimensions=shelf_dimensions,
        products_df=products_df
    )
    
    # Run optimization
    print("Starting shelf optimization...")
    solution = optimizer.optimize_with_cuopt()
    
    # Extract results
    results = optimizer.extract_solution(solution)
    print("\nOptimization Results:")
    print(results)
    
    # Save results to database
    if not results.empty:
        run_id = f"run_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{str(uuid.uuid4())[:8]}"
        total_objective = float(solution.get_total_objective()) if solution.get_status() == 0 and solution.get_total_objective() is not None else None
        
        print(f"\nSaving results to database (run_id: {run_id})...")
        db_manager.save_optimization_results(results, run_id, total_objective)
        print("Results saved successfully!")
    
    # Additional analysis
    print("\nShelf Usage Summary:")
    if not results.empty:
        shelf_summary = results.groupby('shelf_id').agg({
            'product_name': 'count',
            'placement_score': 'mean'
        })
        print(shelf_summary)
    else:
        print("No results to analyze")

# Simplified approach that works with cuOpt's actual API

if __name__ == "__main__":
    main()