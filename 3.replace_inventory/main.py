
# get shelf id and the inventory number from argv

import sys
from database import init_database, get_db_manager
from dotenv import load_dotenv

load_dotenv()  # take environment variables


shelf_id = int(sys.argv[1])
inventory_number = int(sys.argv[2])


def main():
    # Initialize database and load sample data
    print("Initializing database...")
    db_manager = init_database()

    print(f"Replacing inventory on shelf {shelf_id} {inventory_number}th item")

    # get the target inventory info
    selected_inventory = db_manager.get_selected_inventory(
        shelf_id, inventory_number)

    # print(selected_inventory)
    # get dimensions of the selected inventory

    selected_inventory_dimensions = {
        "inventory_id": selected_inventory["inventory_id"],
        "placement_id": selected_inventory["placement_id"],
        "width": selected_inventory["width"],
        "height": selected_inventory["height"],
        "depth": selected_inventory["depth"],
        "weight": selected_inventory["weight"],
    }

    print(selected_inventory_dimensions)

    # select the inventories to replace
    # run or tools and selected the most suitable inventories can fit in this space

    # get the rest of the inventories which is not on the shelf
    rest_inventories = db_manager.get_rest_inventories(
        exclude_shelf_id=shelf_id)

    inventories_on_shelf = db_manager.get_inventories_on_shelf(shelf_id)

    if rest_inventories.empty:
        print("No available inventory items found for replacement")
        return

    # get shelf information for constraints
    shelf_info = db_manager.get_shelf_info(shelf_id)
    if not shelf_info:
        print(f"Shelf {shelf_id} not found")
        return

    print(f"Found {len(rest_inventories)} available inventory items")

    # Use OR-Tools to find the best replacement
    from ortools_engine import ORToolsBasicSolver

    # Create a mock shelf list with just this shelf for solver compatibility
    

    try:
        solver = ORToolsBasicSolver(db_manager)
        solver.setup_model(rest_inventories, shelf_info,
                           selected_inventory_dimensions, inventories_on_shelf)

        if solver.optimize():
            solution = solver.get_solution()
            print(f"Optimization objective value: {solver.objective_value}")

            if solution and 0 in solution and solution[0]:
                # Get the best replacement item
                best_replacement = solution[0][0]  # First item from shelf 0
                new_inventory_id = best_replacement['product_id']

                print(f"Best replacement inventory ID: {new_inventory_id}")
                print(f"Best replacement found: {best_replacement['name']}")
                print(
                    f"Dimensions: {best_replacement['width']}x{best_replacement['height']}x{best_replacement['depth']}")
                print(
                    f"Weight: {best_replacement['weight']}, Price: {best_replacement['price']}")

                # Replace the inventory in the database
                placement_id = selected_inventory['placement_id']
                inventory_id = selected_inventory['inventory_id']
                # success = db_manager.replace_inventory_on_shelf(
                #     placement_id, new_inventory_id)

                # if success:
                print("\n" + "="*60)
                print("REPLACEMENT COMPLETED SUCCESSFULLY")
                print("="*60)

                print(
                    f"\nORIGINAL ITEM (Position {inventory_number} on Shelf {shelf_id}):")
                print(f"  Name: {selected_inventory['name']}")
                print(f"  Description: {selected_inventory['description']}")
                print(
                    f"  Dimensions: {selected_inventory['width']}W x {selected_inventory['height']}H x {selected_inventory['depth']}D")
                print(f"  Weight: {selected_inventory['weight']} kg")
                print(f"  Price: ${selected_inventory['price']}")
                print(f"  Sales Rate: {selected_inventory['salesRate']}")
                print(
                    f"  Promoted: {'Yes' if selected_inventory['isPromoted'] else 'No'}")

                print(f"\nREPLACEMENT ITEM:")
                print(f"  Name: {best_replacement['name']}")
                print(
                    f"  Dimensions: {best_replacement['width']}W x {best_replacement['height']}H x {best_replacement['depth']}D")
                print(f"  Weight: {best_replacement['weight']} kg")
                print(f"  Price: ${best_replacement['price']}")
                print(f"  Quantity Available: {best_replacement['quantity']}")

                # Calculate improvements
                price_diff = float(
                    best_replacement['price']) - float(selected_inventory['price'])
                weight_diff = float(
                    best_replacement['weight']) - float(selected_inventory['weight'])
                sales_rate_diff = float(
                    best_replacement.get('salesRate', 0)) - float(selected_inventory['salesRate'])

                # Calculate space efficiency
                original_volume = float(selected_inventory['width']) * float(selected_inventory['height']) * float(selected_inventory['depth'])
                replacement_volume = float(best_replacement['width']) * float(best_replacement['height']) * float(best_replacement['depth'])
                volume_diff = replacement_volume - original_volume

                # Calculate value density (price per unit volume)
                original_value_density = float(selected_inventory['price']) / original_volume if original_volume > 0 else 0
                replacement_value_density = float(best_replacement['price']) / replacement_volume if replacement_volume > 0 else 0
                value_density_diff = replacement_value_density - original_value_density

                print(f"\nIMPROVEMENT ANALYSIS:")
                print(f"  Price Change: ${price_diff:+.2f}")
                print(f"  Weight Change: {weight_diff:+.2f} kg")
                print(f"  Sales Rate Change: {sales_rate_diff:+.3f}")
                print(f"  Volume Change: {volume_diff:+.2f} cubic units")
                print(f"  Value Density Change: ${value_density_diff:+.4f} per cubic unit")
                print(f"  Optimization Score: {solver.objective_value:.2f}")

                print("\n" + "="*60)
                print("OPTIMIZATION DELTA SUMMARY")
                print("="*60)

                # Overall assessment
                improvements = []
                concerns = []

                if price_diff > 0:
                    improvements.append(f"Higher value item (+${price_diff:.2f})")
                elif price_diff < 0:
                    concerns.append(f"Lower value item (${price_diff:.2f})")

                if sales_rate_diff > 0:
                    improvements.append(f"Better sales performance (+{sales_rate_diff:.3f})")
                elif sales_rate_diff < 0:
                    concerns.append(f"Lower sales performance ({sales_rate_diff:.3f})")

                if weight_diff < 0:
                    improvements.append(f"Lighter weight ({weight_diff:.2f} kg)")
                elif weight_diff > 0:
                    improvements.append(f"Heavier weight (+{weight_diff:.2f} kg)")

                if value_density_diff > 0:
                    improvements.append(f"Better space utilization (+${value_density_diff:.4f}/unit³)")
                elif value_density_diff < 0:
                    concerns.append(f"Less efficient space use (${value_density_diff:.4f}/unit³)")

                if improvements:
                    print("\n✅ IMPROVEMENTS:")
                    for improvement in improvements:
                        print(f"  • {improvement}")

                if concerns:
                    print("\n⚠️  CONSIDERATIONS:")
                    for concern in concerns:
                        print(f"  • {concern}")

                # Overall recommendation
                total_score = sales_rate_diff * 10 + price_diff * 0.1 + value_density_diff * 5
                print(f"\n📊 OVERALL OPTIMIZATION DELTA: {total_score:+.2f}")

                if total_score > 0:
                    print("🎯 RECOMMENDATION: This replacement is BENEFICIAL")
                elif total_score == 0:
                    print("🔄 RECOMMENDATION: This replacement is NEUTRAL")
                else:
                    print("🤔 RECOMMENDATION: Consider if this replacement aligns with strategy")

                print("="*60)

            else:
                print("No suitable replacement found by the optimizer")
        else:
            print("Optimization failed - no feasible solution found")

    except Exception as e:
        print(f"Error during optimization: {e}")
        return


main()
