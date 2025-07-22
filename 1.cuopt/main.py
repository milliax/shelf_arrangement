import cuopt
import pandas as pd
import numpy as np
from datetime import datetime

class ShelfOptimizer:
    def __init__(self, n_shelves, shelf_dimensions, products_df):
        """
        Initialize the shelf optimizer
        
        Args:
            n_shelves: Number of shelves
            shelf_dimensions: Dict with 'width', 'height', 'depth' for each shelf
            products_df: DataFrame with product information
        """
        self.n_shelves = n_shelves
        self.shelf_dimensions = shelf_dimensions
        self.products_df = products_df
        
    def prepare_optimization_data(self):
        """
        Prepare data for cuOpt optimization
        """
        # Create location data for shelf positions
        # Each shelf can have multiple positions (slots)
        locations = []
        location_capacity = []
        
        for shelf_id in range(self.n_shelves):
            # Divide each shelf into slots based on average product width
            avg_product_width = self.products_df['width'].mean()
            n_slots = int(self.shelf_dimensions[shelf_id]['width'] / avg_product_width)
            
            for slot in range(n_slots):
                locations.append({
                    'shelf_id': shelf_id,
                    'slot_id': slot,
                    'x_coord': shelf_id * 100,  # Spacing between shelves
                    'y_coord': slot * avg_product_width,
                    'capacity': self.shelf_dimensions[shelf_id]['depth'],
                    'eye_level': 1 if shelf_id == self.n_shelves // 2 else 0  # Middle shelf is eye-level
                })
                location_capacity.append(self.shelf_dimensions[shelf_id]['depth'])
        
        self.locations_df = pd.DataFrame(locations)
        return self.locations_df
    
    def create_cost_matrix(self):
        """
        Create cost matrix for product-to-location assignments
        Lower cost = better placement
        """
        n_products = len(self.products_df)
        n_locations = len(self.locations_df)
        
        cost_matrix = np.zeros((n_products, n_locations))
        
        for i, product in self.products_df.iterrows():
            for j, location in self.locations_df.iterrows():
                # Base cost
                cost = 100
                
                # Reduce cost for high-margin products at eye level
                if location['eye_level'] == 1:
                    cost -= product['margin'] * 50
                
                # Reduce cost for popular items in accessible locations
                cost -= product['sales_frequency'] * 10
                
                # Increase cost if product doesn't fit
                if product['width'] > self.shelf_dimensions[location['shelf_id']]['width']:
                    cost += 1000
                
                # Category clustering bonus (products of same category should be together)
                # This is simplified - in practice you'd check neighboring slots
                category_bonus = 0
                cost -= category_bonus
                
                cost_matrix[i, j] = max(0, cost)
        
        return cost_matrix
    
    def optimize_with_cuopt(self):
        """
        Use cuOpt to solve the shelf optimization problem
        """
        # Initialize cuOpt data model
        data_model = cuopt.DataModel()
        
        # Add locations (shelf positions)
        locations = self.prepare_optimization_data()
        location_data = cuopt.LocationData(
            len(locations),
            locations[['x_coord', 'y_coord']].values
        )
        data_model.set_location_data(location_data)
        
        # Add products as "vehicles" that need to be assigned to locations
        n_products = len(self.products_df)
        vehicle_data = cuopt.VehicleData(
            n_products,
            [1] * n_products  # Each product needs exactly 1 location
        )
        data_model.set_vehicle_data(vehicle_data)
        
        # Create cost matrix
        cost_matrix = self.create_cost_matrix()
        data_model.set_cost_matrix(cost_matrix)
        
        # Set capacity constraints
        capacity_data = cuopt.CapacityData(
            location_capacity=self.locations_df['capacity'].values,
            demand=self.products_df['depth'].values  # Product depth as demand
        )
        data_model.set_capacity_data(capacity_data)
        
        # Add constraints for product categories
        # Products in the same category should be near each other
        self.add_category_constraints(data_model)
        
        # Create solver and solve
        solver = cuopt.Solver()
        solver.set_data_model(data_model)
        
        # Set solver parameters
        solver_params = cuopt.SolverParams()
        solver_params.time_limit = 30  # 30 seconds
        solver_params.solution_limit = 100
        
        # Solve
        solution = solver.solve(solver_params)
        
        return solution
    
    def add_category_constraints(self, data_model):
        """
        Add constraints to keep products of the same category together
        """
        # Group products by category
        category_groups = self.products_df.groupby('category').groups
        
        for category, product_indices in category_groups.items():
            if len(product_indices) > 1:
                # Create constraint to minimize distance between products in same category
                # This is a simplified version - cuOpt supports various constraint types
                constraint = cuopt.GroupConstraint(
                    product_indices.tolist(),
                    constraint_type='proximity'
                )
                data_model.add_constraint(constraint)
    
    def extract_solution(self, solution):
        """
        Extract and format the optimization solution
        """
        assignments = solution.get_assignments()
        
        results = []
        for product_idx, location_idx in enumerate(assignments):
            if location_idx >= 0:  # Valid assignment
                results.append({
                    'product_id': self.products_df.iloc[product_idx]['product_id'],
                    'product_name': self.products_df.iloc[product_idx]['name'],
                    'shelf_id': self.locations_df.iloc[location_idx]['shelf_id'],
                    'slot_id': self.locations_df.iloc[location_idx]['slot_id'],
                    'placement_score': solution.get_cost()
                })
        
        return pd.DataFrame(results)

# Example usage
def main():
    # Sample product data
    products_data = {
        'product_id': [1, 2, 3, 4, 5, 6, 7, 8],
        'name': ['Cereal A', 'Cereal B', 'Milk', 'Yogurt', 'Bread', 'Chips', 'Soda', 'Water'],
        'category': ['cereal', 'cereal', 'dairy', 'dairy', 'bakery', 'snacks', 'beverages', 'beverages'],
        'width': [30, 25, 15, 10, 40, 20, 15, 20],  # cm
        'depth': [20, 20, 30, 15, 30, 25, 30, 30],  # cm
        'height': [40, 35, 25, 15, 15, 30, 35, 35],  # cm
        'margin': [0.3, 0.35, 0.2, 0.25, 0.15, 0.4, 0.5, 0.1],  # profit margin
        'sales_frequency': [0.8, 0.7, 0.9, 0.6, 0.95, 0.7, 0.8, 0.85]  # 0-1 scale
    }
    products_df = pd.DataFrame(products_data)
    
    # Shelf dimensions (3 shelves)
    shelf_dimensions = {
        0: {'width': 200, 'height': 50, 'depth': 50},  # Top shelf
        1: {'width': 200, 'height': 50, 'depth': 50},  # Eye level
        2: {'width': 200, 'height': 50, 'depth': 50}   # Bottom shelf
    }
    
    # Initialize optimizer
    optimizer = ShelfOptimizer(
        n_shelves=3,
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
    
    # Additional analysis
    print("\nShelf Usage Summary:")
    shelf_summary = results.groupby('shelf_id').agg({
        'product_name': 'count',
        'placement_score': 'mean'
    })
    print(shelf_summary)

# Alternative approach using cuOpt's Pickup and Delivery Problem (PDP) formulation
class ShelfOptimizerPDP:
    """
    Alternative formulation using PDP where:
    - Products are 'pickup' points
    - Shelf locations are 'delivery' points
    - We want to optimize the assignment
    """
    
    def __init__(self, products_df, shelves_df):
        self.products_df = products_df
        self.shelves_df = shelves_df
        
    def setup_pdp_problem(self):
        """
        Set up the problem as a Pickup and Delivery Problem
        """
        n_products = len(self.products_df)
        n_slots = len(self.shelves_df)
        
        # Create pickup-delivery pairs
        pdp_data = cuopt.PDPData()
        
        # Each product must be picked up from warehouse and delivered to a shelf
        for i, product in self.products_df.iterrows():
            pickup_location = 0  # Warehouse
            # Delivery location will be determined by optimization
            pdp_data.add_request(
                pickup_location=pickup_location,
                delivery_location=None,  # To be optimized
                demand=product['depth'],
                priority=product['margin'] * product['sales_frequency']
            )
        
        return pdp_data
    
    def solve_pdp(self):
        """
        Solve using PDP formulation
        """
        solver = cuopt.PDPSolver()
        solver.set_data(self.setup_pdp_problem())
        
        # Configure solver
        config = cuopt.SolverConfig()
        config.time_limit = 60
        config.use_gpu = True
        
        solution = solver.solve(config)
        return solution

if __name__ == "__main__":
    main()