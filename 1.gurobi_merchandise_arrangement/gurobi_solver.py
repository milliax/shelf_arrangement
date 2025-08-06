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

        # that 

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

            # TODO: deal with the solution extraction
