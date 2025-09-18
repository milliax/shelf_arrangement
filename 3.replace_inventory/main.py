
## get shelf id and the inventory number from argv

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

    ## get the target inventory info
    selected_inventory = db_manager.get_selected_inventory(shelf_id, inventory_number)

    # print(selected_inventory)
    # get dimensions of the selected inventory

    selected_inventory_dimensions = {
        "width": selected_inventory["width"],
        "height": selected_inventory["height"],
        "depth": selected_inventory["depth"],
        "weight": selected_inventory["weight"],
    }

    print(selected_inventory_dimensions)

    ## select the inventories to replace
    ## run or tools and selected the most suitable inventories can fit in this space

    # get the rest of the inventories which is not on the shelf

    rest_inventories = db_manager.get_rest_inventories()

    ## write back to database

main()