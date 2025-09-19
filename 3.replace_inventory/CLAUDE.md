# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a shelf arrangement optimization system that replaces specific inventory items on shelves. The system uses OR-Tools for optimization and PostgreSQL for data storage.

## Core Architecture

### Data Models (`models.py`)
- `Inventory`: Product catalog with dimensions, weight, price, sales data and promotional flags
- `Shelves`: Physical shelf specifications with dimensions, weight limits, and eye-level indicators
- `InventoryPlacement`: Junction table linking inventory to shelves with placement order
- `OptimizationRun`: Tracks optimization execution history and parameters
- `ShelfConfiguration`: Template shelf configurations for reuse

### Database Layer (`database.py`)
- `DatabaseManager`: Handles PostgreSQL connections and SQLAlchemy sessions
- Core operations:
  - `get_selected_inventory(shelf_id, inventory_number)`: Retrieves specific item by position
  - `get_rest_inventories(exclude_shelf_id)`: Returns available replacement candidates
  - `get_inventories_on_shelf(shelf_id)`: Gets all items currently on a shelf
  - `replace_inventory_on_shelf(placement_id, new_inventory_id)`: Performs replacement operation
  - `get_shelf_info(shelf_id)`: Retrieves shelf constraints and specifications

### Optimization Engine (`ortools_engine.py`)
- `ORToolsBasicSolver`: SCIP-based linear programming solver (replaced Gurobi)
- **Known Issue**: `get_solution()` method has incorrect variable indexing (`self.x[i, j]` should be `self.x[i]`)
- Constraints: weight capacity, width limits, height restrictions per item
- Objective: maximize sales rate of selected replacement items
- Handles gap spacing (0.25 default) and dimensional constraints

### Entry Point (`main.py`)
- CLI: `python main.py <shelf_id> <inventory_number>`
- Workflow: retrieve target item → find candidates → optimize → replace → display results
- Comprehensive output includes original vs replacement comparison and improvement metrics

## Database Configuration

PostgreSQL connection via environment variables in `.env`:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Connection pooling with pre-ping and 300s recycle
- Session management through SQLAlchemy sessionmaker

## Development Commands

### Running the Application
```bash
python main.py <shelf_id> <inventory_number>
# Example: python main.py 1 3
```

### Required Dependencies
```bash
pip install ortools sqlalchemy pandas python-dotenv psycopg2-binary
```

### Environment Setup
Create `.env` file with database credentials:
```
DB_HOST=cht.infra.esgltc.com
DB_PORT=20000
DB_NAME=postgres
DB_USER=your_username
DB_PASSWORD=your_password
DB_ECHO=false  # Set to true for SQL query logging
```

## Key Implementation Details

### Optimization Logic
- Uses binary variables `x[i]` for item selection (not `x[i,j]` as documented)
- Constraints: width + gap spacing, weight capacity, individual height limits
- Objective: maximize total sales rate of replacement items
- Single-item replacement focus (not multi-shelf optimization)

### Data Flow
1. Extract target item dimensions and placement from shelf
2. Query available inventory excluding current shelf items
3. Calculate remaining shelf capacity after target removal
4. Run optimization with dimensional and weight constraints
5. Update database with optimal replacement
6. Display comprehensive replacement analysis

### Error Handling
- Graceful handling of missing shelves, inventory, or placements
- Optimization failure detection with clear error messages
- Database transaction rollback on replacement failures

## Current Status

The system is functional for single-item replacement optimization. The OR-Tools integration works but has a bug in the solution extraction method that needs fixing for proper multi-item scenarios.