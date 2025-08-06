# cuOpt Setup and Usage Guide

This directory contains NVIDIA cuOpt setup and examples for vehicle routing optimization on GPU.

## Prerequisites

- **NVIDIA GPU** with compute capability 6.0 or higher
- **NVIDIA drivers** (450.80.02 or later)
- **CUDA toolkit** (11.8 or 12.x)
- **Python** 3.8-3.11

## Quick Start

### 1. Verify System Requirements

Run the setup verification script:

```bash
python setup_cuopt.py
```

This will check:
- GPU availability
- CUDA installation
- Python package dependencies
- Run a basic cuOpt test

### 2. Installation Options

#### Option A: Automatic Installation
The setup script will offer to install missing packages automatically.

#### Option B: Manual Installation

For CUDA 11.x:
```bash
pip install cuopt-cu11 cudf-cu11 pandas numpy --extra-index-url=https://pypi.nvidia.com
```

For CUDA 12.x:
```bash
pip install cuopt-cu12 cudf-cu12 pandas numpy --extra-index-url=https://pypi.nvidia.com
```

#### Option C: Conda Installation
```bash
conda create -n cuopt python=3.9
conda activate cuopt
conda install -c rapidsai -c nvidia -c conda-forge cuopt python=3.9 cudatoolkit=11.8
```

#### Option D: Docker (Recommended for production)
```bash
# Pull the official cuOpt container
docker pull nvcr.io/nvidia/cuopt:23.12-py3

# Run with GPU access
docker run --gpus all -it --rm -p 8888:8888 nvcr.io/nvidia/cuopt:23.12-py3
```

### 3. Run Examples

Execute the basic examples:

```bash
python basic_cuopt_example.py
```

## Code Examples

### Basic Vehicle Routing Problem (VRP)

```python
import cuopt
import cudf
import numpy as np

# Create locations and distance matrix
locations = cudf.DataFrame({
    'x': [0.0, 1.0, 2.0, 1.5, 0.5],
    'y': [0.0, 1.0, 0.0, 2.0, 1.5]
})

# Create data model
n_vehicles = 2
data_model = cuopt.DataModel(len(locations), n_vehicles)

# Add cost matrix and constraints
data_model.add_cost_matrix(distance_matrix)
data_model.add_capacity_dimension("demand", demands, capacities)

# Set start/end locations (depot)
data_model.set_start_locations([0, 0])
data_model.set_end_locations([0, 0])

# Solve
solution = cuopt.solve(data_model)
```

### Advanced Features

The `basic_cuopt_example.py` file demonstrates:

- **Capacity constraints** - Vehicle load limits
- **Time windows** - Customer service time constraints  
- **Multiple vehicles** - Fleet optimization
- **Custom cost matrices** - Distance/time-based routing

## Common Use Cases

### 1. Delivery Route Optimization
- Multiple delivery vehicles
- Customer time windows
- Vehicle capacity constraints
- Minimize total distance/time

### 2. Service Technician Routing
- Skilled technician assignments
- Service time requirements
- Geographic territories
- Workday time limits

### 3. Warehouse Order Picking
- Multiple pickers
- Item location optimization
- Capacity constraints
- Minimize travel time

## Troubleshooting

### GPU Not Detected
```bash
# Check GPU status
nvidia-smi

# Verify CUDA installation
nvcc --version
```

### Package Installation Issues
```bash
# Clear pip cache
pip cache purge

# Install with verbose output
pip install cuopt-cu11 --extra-index-url=https://pypi.nvidia.com -v
```

### Memory Issues
- Reduce problem size for testing
- Use smaller batch sizes
- Monitor GPU memory with `nvidia-smi`

### Container Issues
```bash
# Ensure Docker has GPU access
docker run --rm --gpus all nvidia/cuda:11.8-base-ubuntu20.04 nvidia-smi
```

## Performance Tips

1. **Use appropriate data types** - cuDF DataFrames for best performance
2. **Batch operations** - Process multiple problems together
3. **Memory management** - Monitor GPU memory usage
4. **Problem sizing** - Start small and scale up

## File Structure

```
1.cuopt/
├── README.md                 # This guide
├── requirements.txt          # Python dependencies
├── setup_cuopt.py           # Setup verification script
└── basic_cuopt_example.py   # Example implementations
```

## Next Steps

1. **Customize examples** for your specific use case
2. **Integrate with your data** sources
3. **Scale up** problem sizes as needed
4. **Optimize parameters** for your hardware

## Resources

- [NVIDIA cuOpt Documentation](https://docs.rapids.ai/api/cuopt/stable/)
- [cuOpt Examples Repository](https://github.com/rapidsai/cuopt)
- [RAPIDS cuDF Documentation](https://docs.rapids.ai/api/cudf/stable/)

## Support

For issues with cuOpt installation or usage:
1. Check the troubleshooting section above
2. Run `python setup_cuopt.py` for diagnostics
3. Consult NVIDIA Rapids community forums