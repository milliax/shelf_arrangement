import cuopt
import cudf
import numpy as np

def basic_vrp_example():
    """
    Basic Vehicle Routing Problem example using cuOpt
    """
    
    # Define locations (lat, lon coordinates)
    # Depot at index 0, customers at indices 1-4
    locations = cudf.DataFrame({
        'x': [0.0, 1.0, 2.0, 1.5, 0.5],
        'y': [0.0, 1.0, 0.0, 2.0, 1.5]
    })
    
    # Distance matrix calculation (Euclidean distance)
    n_locations = len(locations)
    distance_matrix = cudf.DataFrame(index=range(n_locations), columns=range(n_locations))
    
    for i in range(n_locations):
        for j in range(n_locations):
            if i == j:
                distance_matrix.iloc[i, j] = 0
            else:
                dx = locations.iloc[i]['x'] - locations.iloc[j]['x']
                dy = locations.iloc[i]['y'] - locations.iloc[j]['y']
                distance_matrix.iloc[i, j] = np.sqrt(dx**2 + dy**2)
    
    # Create cuOpt DataModel using routing module
    n_vehicles = 2
    vehicle_capacity = [100, 100]
    
    data_model = cuopt.routing.DataModel(n_locations, n_vehicles)
    
    # Set cost matrix (distance matrix)
    data_model.add_cost_matrix(distance_matrix)
    
    # Add vehicle capacity constraints
    demand = [0, 25, 30, 20, 15]  # depot has 0 demand
    data_model.add_capacity_dimension(
        "demand",
        cudf.Series(demand),
        cudf.Series(vehicle_capacity)
    )
    
    # Set depot (start and end at location 0)
    start_locations = cudf.Series([0, 0])  # Both vehicles start at depot
    end_locations = cudf.Series([0, 0])    # Both vehicles end at depot
    data_model.set_vehicle_locations(start_locations, end_locations)
    
    # Solve using routing module
    routing_solution = cuopt.routing.Solve(data_model)
    
    if routing_solution.get_status() == 0:  # Solution found
        print("Solution found!")
        print(f"Best routes:")
        
        # Get route dataframe
        routes_df = routing_solution.get_route()
        print("Route details:")
        print(routes_df.to_pandas())
        
        print(f"Total cost: {routing_solution.get_total_objective()}")
        
        return routing_solution
    else:
        print(f"No solution found. Status: {routing_solution.get_status()}")
        return None

def advanced_vrp_example():
    """
    More advanced example with time windows and multiple constraints
    """
    
    # Create a larger problem
    n_locations = 10
    n_vehicles = 3
    
    # Generate random locations
    np.random.seed(42)
    locations = cudf.DataFrame({
        'x': np.random.uniform(0, 10, n_locations),
        'y': np.random.uniform(0, 10, n_locations)
    })
    
    # Ensure depot is at (0,0)
    locations.iloc[0] = [0.0, 0.0]
    
    # Calculate distance matrix
    distance_matrix = cudf.DataFrame(index=range(n_locations), columns=range(n_locations))
    for i in range(n_locations):
        for j in range(n_locations):
            if i == j:
                distance_matrix.iloc[i, j] = 0
            else:
                dx = locations.iloc[i]['x'] - locations.iloc[j]['x']
                dy = locations.iloc[i]['y'] - locations.iloc[j]['y']
                distance_matrix.iloc[i, j] = np.sqrt(dx**2 + dy**2)
    
    # Create data model using routing module
    data_model = cuopt.routing.DataModel(n_locations, n_vehicles)
    data_model.add_cost_matrix(distance_matrix)
    
    # Add capacity constraints
    vehicle_capacity = [150, 200, 175]
    demand = [0] + list(np.random.randint(10, 40, n_locations-1))  # depot has 0 demand
    
    data_model.add_capacity_dimension(
        "demand",
        cudf.Series(demand),
        cudf.Series(vehicle_capacity)
    )
    
    # Add time window constraints
    # Service time for each location
    service_times = [0] + [10] * (n_locations - 1)  # 10 minutes per customer
    
    # Time windows: depot open 0-480 (8 hours), customers have various windows
    earliest_times = [0] + list(np.random.randint(60, 240, n_locations-1))  # start windows
    latest_times = [480] + [earliest_times[i] + 120 for i in range(1, n_locations)]  # 2-hour windows
    
    data_model.add_time_window_dimension(
        cudf.Series(service_times),
        cudf.Series(earliest_times),
        cudf.Series(latest_times),
        distance_matrix  # travel time = distance
    )
    
    # Set start and end locations using current API
    start_locations = cudf.Series([0] * n_vehicles)
    end_locations = cudf.Series([0] * n_vehicles)
    data_model.set_vehicle_locations(start_locations, end_locations)
    
    # Solve using routing module
    routing_solution = cuopt.routing.Solve(data_model)
    
    if routing_solution.get_status() == 0:
        print("Advanced solution found!")
        
        # Get route dataframe
        routes_df = routing_solution.get_route()
        print("Route details:")
        print(routes_df.to_pandas())
            
        print(f"Total cost: {routing_solution.get_total_objective()}")
        return routing_solution
    else:
        print(f"No solution found. Status: {routing_solution.get_status()}")
        return None

if __name__ == "__main__":
    print("Running basic VRP example...")
    basic_solution = basic_vrp_example()
    
    print("\n" + "="*50 + "\n")
    
    print("Running advanced VRP example...")
    advanced_solution = advanced_vrp_example()