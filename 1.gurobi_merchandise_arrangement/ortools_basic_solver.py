from ortools.linear_solver import pywraplp
from database import init_database, get_db_manager
from models import Inventory


class ORToolsBasicSolver:
    """Basic OR-Tools SCIP solver - direct replacement for Gurobi"""

    def __init__(self, db_manager):
        self.db_manager = db_manager
        self.solver = pywraplp.Solver.CreateSolver('SCIP')
        if not self.solver:
            raise Exception('SCIP solver unavailable')

        # Set basic solver parameters
        self.solver.set_time_limit(300000)  # 5 minutes timeout
        self.solver.EnableOutput()  # Enable output

    def setup_model(self, merchandise, shelves):
        self.merchandise = merchandise
        self.shelves = shelves

        num_items = len(merchandise)
        num_shelves = len(shelves)

        # Binary variables
        self.x = {}  # item i on shelf j
        self.y = {}  # item i is displayed

        # Create variables
        for i in range(num_items):
            self.y[i] = self.solver.BoolVar(f'item_{i}_displayed')

        for i in range(num_items):
            for j in range(num_shelves):
                self.x[i, j] = self.solver.BoolVar(f'item_{i}_on_shelf_{j}')

        # Constraint: one item can only be displayed on one shelf
        for i in range(num_items):
            constraint = self.solver.Constraint(0, 0, f'item_{i}_displayed_once')
            constraint.SetCoefficient(self.y[i], -1)
            for j in range(num_shelves):
                constraint.SetCoefficient(self.x[i, j], 1)

        # Constraint: shelf weight limits
        for j in range(num_shelves):
            constraint = self.solver.Constraint(0, float(shelves[j].weight), f'shelf_{j}_max_weight')
            for i in range(num_items):
                weight = float(self.merchandise.iloc[i]['weight'])
                constraint.SetCoefficient(self.x[i, j], weight)

        # Constraint: shelf width limits (including gaps)
        for j in range(num_shelves):
            constraint = self.solver.Constraint(0, float(shelves[j].width), f'shelf_{j}_max_width')
            for i in range(num_items):
                width = float(self.merchandise.iloc[i]['width'])
                gap = float(shelves[j].gap)
                width_with_gap = width + gap
                constraint.SetCoefficient(self.x[i, j], width_with_gap)

        # Constraint: shelf height limits (each item must fit)
        for j in range(num_shelves):
            for i in range(num_items):
                item_height = float(self.merchandise.iloc[i]['height'])
                shelf_height = float(shelves[j].height)
                if item_height > shelf_height:
                    # Force this combination to be 0
                    constraint = self.solver.Constraint(0, 0, f'item_{i}_shelf_{j}_height_limit')
                    constraint.SetCoefficient(self.x[i, j], 1)

        # Constraint: shelf depth limits
        for j in range(num_shelves):
            constraint = self.solver.Constraint(0, float(shelves[j].depth), f'shelf_{j}_max_depth')
            for i in range(num_items):
                depth = float(self.merchandise.iloc[i]['depth'])
                constraint.SetCoefficient(self.x[i, j], depth)

        # Constraint: promoted items must be displayed
        for i in range(num_items):
            if self.merchandise.iloc[i]['isPromoted']:
                constraint = self.solver.Constraint(1, 1, f'promoted_item_{i}_must_display')
                constraint.SetCoefficient(self.y[i], 1)

        # Objective function: maximize displayed items + eye-level promotions + revenue
        objective = self.solver.Objective()

        # Maximize number of displayed items
        for i in range(num_items):
            objective.SetCoefficient(self.y[i], 1)

        # Add eye-level promotion bonus
        for i in range(num_items):
            if self.merchandise.iloc[i]['isPromoted']:
                for j in range(num_shelves):
                    if shelves[j].eye_level:
                        objective.SetCoefficient(self.x[i, j], 10000)

        # Add revenue consideration
        for i in range(num_items):
            price = float(self.merchandise.iloc[i]["price"])
            sales_rate = float(self.merchandise.iloc[i]["salesRate"])
            revenue = price * sales_rate
            objective.SetCoefficient(self.y[i], revenue)

        objective.SetMaximization()

    def optimize(self):
        status = self.solver.Solve()

        if status == pywraplp.Solver.OPTIMAL:
            print("Optimal solution found")
            return True
        elif status == pywraplp.Solver.FEASIBLE:
            print("Feasible solution found")
            return True
        else:
            print("No optimal solution found")
            return False

    def get_solution(self):
        if self.solver.Solve() == pywraplp.Solver.OPTIMAL or self.solver.Solve() == pywraplp.Solver.FEASIBLE:
            solution = {}

            for j in range(len(self.shelves)):
                solution[j] = []
                for i in range(len(self.merchandise)):
                    if self.x[i, j].solution_value() > 0.5:
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

    @property
    def objective_value(self):
        """Get the objective value (equivalent to Gurobi's ObjVal)"""
        return self.solver.Objective().Value()