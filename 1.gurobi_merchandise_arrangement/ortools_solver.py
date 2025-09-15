from ortools.linear_solver import pywraplp
from ortools.sat.python import cp_model
from database import init_database, get_db_manager
from models import Inventory
import sys
import time
import multiprocessing


class ORToolsSolver:
    def __init__(self, db_manager, use_cp_sat=True):
        self.db_manager = db_manager
        self.use_cp_sat = use_cp_sat

        if use_cp_sat:
            # Use CP-SAT solver (faster, better parallelization)
            self.model = cp_model.CpModel()
            self.solver = cp_model.CpSolver()

            # Get number of CPU cores
            num_cores = multiprocessing.cpu_count()
            print(f"🚀 Using CP-SAT solver with {num_cores} CPU cores")

            # Configure for maximum performance
            self.solver.parameters.max_time_in_seconds = 300.0  # 5 minutes
            self.solver.parameters.num_search_workers = num_cores  # Use all cores
            self.solver.parameters.log_search_progress = True
            self.solver.parameters.log_to_stdout = True

            # Advanced performance parameters
            self.solver.parameters.search_branching = cp_model.PORTFOLIO_SEARCH
            self.solver.parameters.cp_model_presolve = True
            self.solver.parameters.linearization_level = 2
            self.solver.parameters.symmetry_level = 2

        else:
            # Fallback to SCIP with parallel configuration
            self.solver = pywraplp.Solver.CreateSolver('SCIP')
            if not self.solver:
                raise Exception('SCIP solver unavailable')

            num_cores = multiprocessing.cpu_count()
            print(f"🚀 Using SCIP solver with {num_cores} CPU cores")

            # Set solver parameters for performance and verbose output
            self.solver.set_time_limit(300000)  # 5 minutes timeout
            self.solver.EnableOutput()  # Enable detailed output

            # Additional parameters for parallel processing and performance
            if hasattr(self.solver, 'SetSolverSpecificParametersAsString'):
                self.solver.SetSolverSpecificParametersAsString(
                    f"parallel/maxnthreads = {num_cores}\n"
                    "parallel/mode = 1\n"  # Enable parallel mode
                    "display/verblevel = 5\n"
                    "display/freq = 1\n"
                    "limits/solutions = -1\n"
                    "numerics/feastol = 1e-6\n"
                    "concurrent/scip/feastol = 1e-6\n"
                    "lp/threads = -1\n"  # Use all available threads for LP
                    "separating/maxcuts = 2000\n"
                    "separating/maxcutsroot = 5000\n"
                )

    def setup_model(self, merchandise, shelves):
        self.merchandise = merchandise
        self.shelves = shelves

        num_items = len(merchandise)
        num_shelves = len(shelves)

        # Binary variables
        self.x = {}  # item i on shelf j
        self.y = {}  # item i is displayed

        if self.use_cp_sat:
            # Create variables for CP-SAT
            for i in range(num_items):
                self.y[i] = self.model.NewBoolVar(f'item_{i}_displayed')

            for i in range(num_items):
                for j in range(num_shelves):
                    self.x[i, j] = self.model.NewBoolVar(f'item_{i}_on_shelf_{j}')
        else:
            # Create variables for SCIP
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

    def _show_progress(self, phase, elapsed_time, details=""):
        """Show real-time progress using \\r to overwrite the line"""
        progress_msg = f"\r⏳ {phase} | Time: {elapsed_time:.2f}s"
        if details:
            progress_msg += f" | {details}"
        print(progress_msg, end="", flush=True)

    def optimize(self):
        print("\n=== Starting OR-Tools Optimization ===")
        print(f"Variables: {self.solver.NumVariables()}")
        print(f"Constraints: {self.solver.NumConstraints()}")
        print("Solver: SCIP (with verbose output enabled)")
        print("=" * 50)

        # Show preprocessing progress
        start_time = time.time()
        self._show_progress("Preprocessing", 0, "Setting up problem...")
        time.sleep(0.1)  # Brief pause to show the message

        # Show solving progress with periodic updates
        self._show_progress("Solving", time.time() - start_time, "Optimizing...")

        # Start optimization with detailed output
        solve_start = time.time()
        self.status = self.solver.Solve()
        solve_time = time.time() - solve_start

        # Clear the progress line and show final results
        print("\r" + " " * 80 + "\r", end="")  # Clear the line
        print("=" * 50)

        total_time = time.time() - start_time
        if self.status == pywraplp.Solver.OPTIMAL:
            print("✓ Optimal solution found")
            print(f"Final objective value: {self.solver.Objective().Value()}")
            print(f"Solve time: {solve_time*1000:.1f}ms")
            print(f"Total time: {total_time*1000:.1f}ms")
            return True
        elif self.status == pywraplp.Solver.FEASIBLE:
            print("✓ Feasible solution found")
            print(f"Final objective value: {self.solver.Objective().Value()}")
            print(f"Solve time: {solve_time*1000:.1f}ms")
            print(f"Total time: {total_time*1000:.1f}ms")
            return True
        else:
            print("❌ No optimal solution found")
            print(f"Status: {self.status}")
            print(f"Total time: {total_time*1000:.1f}ms")
            return False

    def get_solution(self):
        if hasattr(self, 'status') and (self.status == pywraplp.Solver.OPTIMAL or self.status == pywraplp.Solver.FEASIBLE):
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