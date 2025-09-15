from gurobipy import Model, GRB
from database import init_database, get_db_manager
from models import Inventory

class GurobiSolver:
    def __init__(self, db_manager):
        self.db_manager = db_manager
        self.model = Model("Merchandise Arrangement")
        self.model.setParam('OutputFlag', 0)

        self.model.setParam('PoolSearchMode', 2)  # 1 = find multiple solutions
        self.model.setParam('PoolSolutions', 100)  # Maximum number of solutions to keep
        self.model.setParam('Method', 1)  # Use dual simplex

        self.model.setParam('Threads', 16)  # Use 16 threads (adjust based on your CPU)

        self.model.setParam('MIPGap', 0.01)  # Accept solution within 1% of optimal
        self.model.setParam('OptimalityTol', 1e-6)  # For numerical precision

        self.model.setParam('LogToConsole', 1)  # Show progress

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
            self.model.addConstr(
                sum(self.merchandise.iloc[i]['width'] * self.x[i, j] for i in range(num_items)) +
                shelves[j].gap * (sum(self.x[i, j]
                                  for i in range(num_items)) - 1) <= shelves[j].width,
                name=f"shelf_{j}_max_width"
            )

            self.model.addConstrs((self.merchandise.iloc[i]['height'] * self.x[i, j] <= self.shelves[j].height for i in range(
                num_items) for j in range(num_shelves)), name="shelf_height_limit_{}".format(j))
            # self.model.addConstr(
            #     gp.max_(self.merchandise.iloc[i]['height'] * self.x[i, j]
            #         for i in range(num_items)) < shelves[j].height,
            #     name=f"shelf_{j}_max_height"
            # )

            self.model.addConstr(
                sum(self.merchandise.iloc
                    [i]['depth'] * self.x[i, j] for i in range(num_items)) <= shelves[j].depth,
                name=f"shelf_{j}_max_depth"
            )

        # Set up constraints for eye-level display
        # make sure promoted items are displayed on eye-level shelves if possible, and must be displayed
        # if the item is promoted and there are still space on the shelf, it must be displayed

        # for i in range(num_items):

        #     # print(self.merchandise.iloc[i])

        #     if self.merchandise.iloc[i]['isPromoted']:
        #         # print(f"Item {i} is promoted")
        #         self.model.addConstr(
        #             self.y[i] == 1,
        #             name=f"promoted_item_{i}_must_display"
        #         )
        for i in range(num_items):
            if self.merchandise.iloc[i]['isPromoted']:
                # the more promoted items in eye-level shelf the better
                # self.model.addConstr(
                #     sum(self.x[i, j] for j in range(num_shelves) if shelves[j].eye_level) >= self.y[i],
                #     name=f"promoted_item_{i}_eye_level"
                # )

                self.model.addConstr(
                    self.y[i] == 1,
                    name=f"promoted_item_{i}_must_display"
                )

        """ Objective functions """

        self.model.setObjective(
            # maximize the number of displayed items
            sum(self.y[i] for i in range(num_items))
            #
            + sum(10000 for i in range(num_items)
                  for j in range(num_shelves) if shelves[j].eye_level and self.merchandise.iloc[i]['isPromoted'])
            # take salesRate into consideration
            + sum(self.merchandise.iloc[i]["price"] * self.merchandise.iloc[i]["salesRate"] for i in range(num_items)
                if self.y[i])
            , GRB.MAXIMIZE)
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
                        # print(f"Item {i} is on shelf {j}")
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