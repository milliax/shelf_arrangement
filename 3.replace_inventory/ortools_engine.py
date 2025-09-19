from ortools.linear_solver import pywraplp
from database import init_database, get_db_manager
from models import Inventory


class ORToolsBasicSolver:
    """Basic OR-Tools SCIP solver - direct replacement for Gurobi"""

    def __init__(self, db_manager, time_limit_ms=300000, enable_output=False):
        self.db_manager = db_manager
        self.solver = pywraplp.Solver.CreateSolver('SCIP')
        if not self.solver:
            raise Exception('SCIP solver unavailable')

        # Set solver parameters
        self.solver.set_time_limit(time_limit_ms)  # Default 5 minutes timeout
        if enable_output:
            self.solver.EnableOutput()

        # Store model state
        self.x = {}
        self.merchandise = None
        self.shelf = None
        self.is_solved = False

    def setup_model(self, merchandise, shelf, dimension_constraint, inventories_on_shelf):
        self.merchandise = merchandise
        self.shelf = shelf
        self.inventories_on_shelf = inventories_on_shelf

        num_items = len(merchandise)

        # calculate the weight remaining after removing the selected inventory

        total_weight_on_shelf = 0
        for _, item in inventories_on_shelf.iterrows():
            total_weight_on_shelf += item['weight']

        total_weight_on_shelf -= dimension_constraint['weight']

        # Binary variables
        self.x = {}  # item i is displayed

        # Create variables
        for i in range(num_items):
            self.x[i] = self.solver.BoolVar(f'item_{i}_displayed')

        # Each item can be placed on only one shelf
        for i in range(num_items):
            self.solver.Add(self.x[i] <= 1)

        # add constraints that width cannot exceed the original one

        width_constraint = dimension_constraint["width"]
        weight_constraint = shelf['weight']
        height_constraint = shelf['height']
        gap = shelf.get('gap', 0.25)  # Default gap if not specified

        self.solver.Add(
            sum(self.x[i] * (float(self.merchandise.iloc[i]['width']) + gap) for i in range(num_items))
            <= width_constraint
        )

        self.solver.Add(
            sum(self.x[i] * float(self.merchandise.iloc[i]['weight']) for i in range(num_items))
            <= (weight_constraint - total_weight_on_shelf)
        )

        # any one of the inventory cannot exceed the height of the shelf
        for i in range(num_items):
            self.solver.Add(
                self.x[i] * float(self.merchandise.iloc[i]['height']) <= height_constraint
            )

        # Objective: maximize total sales rate of displayed items
        objective = self.solver.Objective()
        for i in range(num_items):
            objective.SetCoefficient(self.x[i], float(self.merchandise.iloc[i]['salesRate']))
        objective.SetMaximization()

    def optimize(self):
        """
        Solve the optimization problem.
        Returns True if a solution was found, False otherwise.
        """
        status = self.solver.Solve()

        if status == pywraplp.Solver.OPTIMAL:
            print("Optimal solution found")
            self.is_solved = True
            return True
        elif status == pywraplp.Solver.FEASIBLE:
            print("Feasible solution found")
            self.is_solved = True
            return True
        elif status == pywraplp.Solver.INFEASIBLE:
            print("Problem is infeasible - no solution exists")
            self.is_solved = False
            return False
        elif status == pywraplp.Solver.UNBOUNDED:
            print("Problem is unbounded")
            self.is_solved = False
            return False
        else:
            print("No solution found")
            self.is_solved = False
            return False

    def get_solution(self):
        """
        Extract the solution from the last solve.
        Should only be called after optimize() returns True.
        """
        if not self.is_solved:
            print("No solution available. Call optimize() first.")
            return None

        try:
            solution = {}

            # For single shelf replacement, we only have one shelf (index 0)
            solution[0] = []
            for i in range(len(self.merchandise)):
                if self.x[i].solution_value() > 0.5:
                    solution[0].append({
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
        except Exception as e:
            print(f"Error extracting solution: {e}")
            return None

    def get_solver_stats(self):
        """Get solver statistics"""
        if not self.is_solved:
            return None

        return {
            'wall_time': self.solver.wall_time(),
            'iterations': self.solver.iterations(),
            'objective_value': self.objective_value,
            'num_variables': self.solver.NumVariables(),
            'num_constraints': self.solver.NumConstraints()
        }

    @property
    def objective_value(self):
        """Get the objective value (equivalent to Gurobi's ObjVal)"""
        if not self.is_solved:
            return 0.0
        return self.solver.Objective().Value()
