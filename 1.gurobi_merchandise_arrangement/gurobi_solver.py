from gurobipy import Model, GRB
from database import init_database, get_db_manager
from models import Inventory


class GurobiSolver:
    def __init__(self, db_manager):
        self.db_manager = db_manager
        self.model = Model("Merchandise Arrangement")
        self.model.setParam('OutputFlag', 0)

    def setup_model(self, merchandise, shelves):
        # Define variables, constraints, and objective function here
        # Example: self.model.addVar(name="x", vtype=GRB.BINARY)

        self.merchandise = merchandise
        self.shelves = shelves

        # deal with the merchandise display

        self.x = {}  # item on shelf
        self.y = {}  # item displayed

        num_items = len(merchandise)
        num_shelves = len(shelves)

        # setup variables

        for i in range(num_items):
            self.y[i] = self.model.addVar(
                vtype=GRB.BINARY, name=f"item_{i}_displayed")

        for j in range(num_shelves):
            for i in range(num_items):
                self.x[i, j] = self.model.addVar(
                    vtype=GRB.BINARY, name=f"item_{i}_on_shelf_{j}")

        """ Set up constraints for merchandise arrangement """
        # that one item can only be displayed on one shelf

        for i in range(num_items):
            self.model.addConstr(
                sum(self.x[i, j] for j in range(num_shelves)) == self.y[i],
                name=f"item_{i}_displayed_once"
            )

        # items on the shelf cannot exceed the shelf's maximum weight

        for j in range(num_shelves):
            self.model.addConstr(
                sum(self.merchandise.iloc[i]['weight'] * self.x[i, j]
                    for i in range(num_items)) <= shelves[j].weight,
                name=f"shelf_{j}_max_weight"
            )

        # items on the shelf cannot exceed the shelf's dimensions

        for j in range(num_shelves):

            # gap is considered in the shelf configuration that every items in between consists a gap
            # self.model.addConstr(
            #     sum(self.merchandise.iloc[i]['width'] * self.x[i, j]
            #         for i in range(num_items)) + (shelves[j].gap * (num_items - 1)) <= shelves[j].width,
            #     name=f"shelf_{j}_max_width"
            # )

            self.model.addConstr(
                sum(self.merchandise.iloc[i]['width'] * self.x[i, j] for i in range(num_items)) +
                shelves[j].gap * (sum(self.x[i, j]
                                  for i in range(num_items)) - 1) <= shelves[j].width,
                name=f"shelf_{j}_max_width"
            )

            # self.model.addConstr(
            #     sum(self.merchandise.iloc[i]['width'] * self.x[i, j]
            #         for i in range(num_items)) <= shelves[j]['width'],
            #     name=f"shelf_{j}_max_width"
            # )
            self.model.addConstr(
                sum(self.merchandise.iloc[i]['height'] * self.x[i, j]
                    for i in range(num_items)) <= shelves[j].height,
                name=f"shelf_{j}_max_height"
            )
            self.model.addConstr(
                sum(self.merchandise.iloc
                    [i]['depth'] * self.x[i, j] for i in range(num_items)) <= shelves[j].depth,
                name=f"shelf_{j}_max_depth"
            )

        # Objective function: maximize the number of displayed items
        self.model.setObjective(
            sum(self.y[i] for i in range(num_items)), GRB.MAXIMIZE)

        pass

    def optimize(self):
        self.model.optimize()
        if self.model.status == GRB.OPTIMAL:
            print("Optimal solution found")
            return True
        else:
            print("No optimal solution found")
            return False

    def get_solution(self):
        if self.model.status == GRB.OPTIMAL:
            solution = {}

            # show the items that is displayed on the shelf and seperated with the shelf

            # print(self.merchandise.iloc[0])

            for j in range(len(self.shelves)):
                solution[j] = []
                for i in range(len(self.merchandise)):
                    if self.x[i, j].X > 0.5:
                        print(f"Item {i} is on shelf {j}")
                        solution[j].append({
                            'product_id': self.merchandise.iloc[i]['product_id'],
                            'name': self.merchandise.iloc[i]['name'],
                            'width': self.merchandise.iloc[i]['width'],
                            'height': self.merchandise.iloc[i]['height'],
                            'depth': self.merchandise.iloc[i]['depth'],
                            'weight': self.merchandise.iloc[i]['weight'],
                            'price': self.merchandise.iloc[i]['price'],
                            'quantity': self.merchandise.iloc[i]['quantity']
                        })
            return solution
        else:
            return None
