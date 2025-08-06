import cuopt
import cudf
import pandas as pd
import numpy as np

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
        # Create location data - warehouse (0) + shelf positions
        locations = []
        
        # Add warehouse location at index 0
        locations.append({
            'shelf_id': -1,  # Warehouse
            'slot_id': -1,
            'x_coord': 0.0,
            'y_coord': 0.0,
            'capacity': 999999,  # Unlimited warehouse capacity
            'eye_level': 0
        })
        
        # Add shelf slot locations
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
        
        self.locations_df = pd.DataFrame(locations)
        return self.locations_df
    
    def create_cost_matrix(self):
        """
        Create cost matrix for product-to-location assignments
        Lower cost = better placement
        """
        n_products = len(self.products_df)
        n_locations = len(self.locations_df)
        
        cost_matrix = np.zeros((n_locations, n_locations))
        
        # Create distance-based cost matrix for routing
        for i in range(n_locations):
            for j in range(n_locations):
                if i == j:
                    cost_matrix[i, j] = 0
                else:
                    # Calculate Euclidean distance
                    dx = self.locations_df.iloc[i]['x_coord'] - self.locations_df.iloc[j]['x_coord']
                    dy = self.locations_df.iloc[i]['y_coord'] - self.locations_df.iloc[j]['y_coord']
                    distance = np.sqrt(dx**2 + dy**2)
                    
                    # Add penalties/bonuses for shelf optimization
                    if j > 0:  # Not warehouse
                        location = self.locations_df.iloc[j]
                        
                        # Bonus for eye-level shelves (reduce cost)
                        if location['eye_level'] == 1:
                            distance *= 0.7
                        
                        # Penalty for capacity issues
                        shelf_id = location['shelf_id']
                        if shelf_id >= 0:  # Valid shelf
                            # Check if any product might not fit
                            max_product_width = self.products_df['width'].max()
                            if max_product_width > self.shelf_dimensions[shelf_id]['width']:
                                distance *= 1.5
                    
                    cost_matrix[i, j] = distance
        
        return cost_matrix
    
    def optimize_with_cuopt(self):
        """
        Use cuOpt to solve the shelf optimization problem as an assignment problem
        """
        # Prepare location data
        locations = self.prepare_optimization_data()
        n_locations = len(locations)
        n_products = len(self.products_df)
        
        # Create cost matrix for assignment
        cost_matrix = self.create_cost_matrix()
        
        # Convert to cudf DataFrame for cuOpt
        cost_df = cudf.DataFrame(cost_matrix)
        
        # Create data model - treat as VRP where each product is a vehicle
        # that needs to visit exactly one location (shelf slot)
        data_model = cuopt.routing.DataModel(n_locations, n_products)
        
        # Add cost matrix
        data_model.add_cost_matrix(cost_df)
        
        # Add capacity constraints
        # Each shelf slot can hold products up to its depth capacity
        slot_capacities = self.locations_df['capacity'].values
        product_demands = self.products_df['depth'].values
        
        # Create demand array - each location has 0 demand except warehouse has all products
        demand_array = [sum(product_demands)] + [0] * (n_locations - 1)
        
        data_model.add_capacity_dimension(
            "shelf_capacity",
            cudf.Series(demand_array),
            cudf.Series(product_demands)  # Vehicle capacities (what each product needs)
        )
        
        # Set vehicle start and end locations (all products start and end at warehouse)
        start_locations = cudf.Series([0] * n_products)
        end_locations = cudf.Series([0] * n_products)  
        data_model.set_vehicle_locations(start_locations, end_locations)
        
        # Solve the optimization problem
        solution = cuopt.routing.Solve(data_model)
        
        return solution
    
    def add_category_constraints(self, data_model):
        """
        Add constraints to keep products of the same category together
        Note: This is a placeholder as cuOpt's constraint system may vary
        """
        # Category constraints would be implemented based on cuOpt's actual constraint API
        # For now, this is handled through the cost matrix by giving bonuses
        # for products of the same category being placed near each other
        pass
    
    def extract_solution(self, solution):
        """
        Extract and format the optimization solution
        """
        if solution.get_status() != 0:
            print(f"No solution found. Status: {solution.get_status()}")
            return pd.DataFrame()
        
        # Get the route dataframe
        routes_df = solution.get_route()
        
        results = []
        
        # Group routes by truck_id (product_idx)
        for truck_id in routes_df['truck_id'].unique().to_pandas():
            vehicle_route = routes_df[routes_df['truck_id'] == truck_id]
            # Find delivery locations (not depot)
            deliveries = vehicle_route[vehicle_route['type'] == 'Delivery']
            
            if not deliveries.empty:
                # Get the first delivery location
                location_idx = int(deliveries.iloc[0]['location'].values[0])
                if location_idx > 0 and location_idx < len(self.locations_df):
                    truck_id_int = int(truck_id)
                    results.append({
                        'product_id': self.products_df.iloc[truck_id_int]['product_id'],
                        'product_name': self.products_df.iloc[truck_id_int]['name'],
                        'shelf_id': self.locations_df.iloc[location_idx]['shelf_id'],
                        'slot_id': self.locations_df.iloc[location_idx]['slot_id'],
                        'placement_score': solution.get_total_objective()
                    })
        
        return pd.DataFrame(results)