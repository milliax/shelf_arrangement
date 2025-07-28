"""
Setup and verification script for cuOpt installation
"""

import sys
import subprocess
import importlib.util

def check_gpu():
    """Check if NVIDIA GPU is available"""
    try:
        result = subprocess.run(['nvidia-smi'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ NVIDIA GPU detected")
            print(result.stdout.split('\n')[8:12])  # Show GPU info
            return True
        else:
            print("✗ NVIDIA GPU not detected or nvidia-smi not available")
            return False
    except FileNotFoundError:
        print("✗ nvidia-smi command not found")
        return False

def check_cuda():
    """Check CUDA installation"""
    try:
        result = subprocess.run(['nvcc', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ CUDA toolkit detected")
            version_line = [line for line in result.stdout.split('\n') if 'release' in line.lower()]
            if version_line:
                print(f"  {version_line[0].strip()}")
            return True
        else:
            print("✗ CUDA toolkit not found")
            return False
    except FileNotFoundError:
        print("✗ nvcc command not found")
        return False

def check_python_packages():
    """Check if required Python packages are installed"""
    packages = ['cuopt', 'cudf', 'pandas', 'numpy']
    installed = []
    missing = []
    
    for package in packages:
        spec = importlib.util.find_spec(package)
        if spec is not None:
            print(f"✓ {package} is installed")
            installed.append(package)
        else:
            print(f"✗ {package} is NOT installed")
            missing.append(package)
    
    return installed, missing

def install_cuopt():
    """Install cuOpt and dependencies"""
    print("Installing cuOpt...")
    
    # Detect CUDA version
    try:
        import torch
        if torch.cuda.is_available():
            cuda_version = torch.version.cuda
            print(f"Detected CUDA {cuda_version}")
    except ImportError:
        cuda_version = "11.8"  # Default assumption
        print(f"Using default CUDA {cuda_version}")
    
    # Choose appropriate package version
    if cuda_version.startswith("12"):
        packages = [
            "cuopt-cu12",
            "cudf-cu12", 
            "pandas",
            "numpy"
        ]
        extra_index_url = "https://pypi.nvidia.com"
    else:
        packages = [
            "cuopt-cu11",
            "cudf-cu11",
            "pandas", 
            "numpy"
        ]
        extra_index_url = "https://pypi.nvidia.com"
    
    # Install packages
    cmd = [sys.executable, "-m", "pip", "install"] + packages + ["--extra-index-url", extra_index_url]
    
    try:
        subprocess.run(cmd, check=True)
        print("✓ cuOpt installation completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Installation failed: {e}")
        return False

def run_test():
    """Run a simple test to verify cuOpt works"""
    try:
        import cuopt.routing
        import cudf
        import numpy as np
        
        print("Running cuOpt test...")
        
        # Simple 3-location test
        locations = cudf.DataFrame({
            'x': [0.0, 1.0, 2.0],
            'y': [0.0, 1.0, 0.0]
        })
        
        distance_matrix = cudf.DataFrame({
            '0': [0.0, 1.41, 2.0],
            '1': [1.41, 0.0, 1.0],
            '2': [2.0, 1.0, 0.0]
        })
        
        data_model = cuopt.routing.DataModel(3, 1)
        data_model.add_cost_matrix(distance_matrix)
        data_model.set_vehicle_locations(cudf.Series([0]), cudf.Series([0]))
        
        solution = cuopt.routing.Solve(data_model)
        
        if solution.get_status() == 0:
            print("✓ cuOpt test passed successfully!")
            routes = solution.get_route()
            print(f"  Test route: {routes['route'].to_arrow().to_pylist()}")
            print(f"  Total cost: {solution.get_total_objective()}")
            return True
        else:
            print(f"✗ cuOpt test failed with status: {solution.get_status()}")
            return False
            
    except Exception as e:
        print(f"✗ cuOpt test failed with error: {e}")
        return False

def main():
    """Main setup verification"""
    print("cuOpt Setup Verification")
    print("=" * 30)
    
    # Check system requirements
    gpu_ok = check_gpu()
    cuda_ok = check_cuda()
    
    if not gpu_ok:
        print("\nWarning: No NVIDIA GPU detected. cuOpt requires NVIDIA GPU.")
        response = input("Continue anyway? (y/N): ")
        if response.lower() != 'y':
            sys.exit(1)
    
    # Check packages
    print("\nChecking Python packages...")
    installed, missing = check_python_packages()
    
    if missing:
        print(f"\nMissing packages: {missing}")
        response = input("Install missing packages? (Y/n): ")
        if response.lower() != 'n':
            if install_cuopt():
                print("\nRe-checking packages...")
                installed, missing = check_python_packages()
        
    if not missing:
        print("\nRunning cuOpt test...")
        if run_test():
            print("\n✓ cuOpt setup complete and working!")
        else:
            print("\n✗ cuOpt test failed. Check installation.")
    else:
        print(f"\n✗ Still missing packages: {missing}")
        print("Please install manually using:")
        print("pip install cuopt-cu11 --extra-index-url=https://pypi.nvidia.com")

if __name__ == "__main__":
    main()