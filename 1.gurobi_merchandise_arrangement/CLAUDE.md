# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a merchandise shelf arrangement optimization system that uses Gurobi solver to solve a bin packing/knapsack problem for optimal product placement on retail shelves. The system models the problem as a mathematical optimization to maximize displayed items while considering physical constraints and promotional priorities.

## Key Commands

### Running the Application
```bash
python main.py
```
This executes the complete optimization pipeline: loads inventory from database, configures shelves, runs Gurobi optimization, and saves results.

### Database Operations
The system uses PostgreSQL with both SQLAlchemy ORM and Prisma schema definitions. Database connection details are configured in `.env` file.

## Architecture

### Core Components

**GurobiSolver** (`gurobi_solver.py`)
- Implements the mathematical optimization model
- Sets up binary variables for item placement and display decisions
- Defines constraints for weight, dimensions, and promotional requirements
- Includes timing functionality to track optimization duration
- Key constraint types:
  - One item per shelf constraint
  - Shelf weight/dimension limits
  - Mandatory display for promoted items
  - Eye-level placement preferences for promotions

**DatabaseManager** (`database.py`)
- Handles PostgreSQL connections using environment variables
- Provides methods for inventory queries with dimensional filtering
- Manages optimization results and shelf configuration storage
- Uses connection pooling and automatic reconnection

**Models** (`models.py`)
- SQLAlchemy ORM models for Inventory, Shelves, InventoryPlacement, OptimizationRun
- Includes promotional flags and dimensional attributes
- Supports relationship mapping between inventory and shelf placements

**ShelfConfiguration** (`shelf_configuration.py`)
- Dataclass defining shelf physical properties (width, height, depth, weight capacity)
- Includes gap spacing and eye-level designation
- Used for constraint generation in optimization model

### Data Flow
1. `main.py` initializes database connection and shelf configurations
2. Inventory is filtered by maximum shelf dimensions to ensure feasibility
3. `GurobiSolver` builds mathematical model with constraints and objectives
4. Optimization runs with timing measurement
5. Results are parsed and saved to database via `DatabaseManager`

### Key Design Patterns
- The system prioritizes promoted items by forcing display (`y[i] == 1` constraint)
- Eye-level shelves receive preference in objective function (10000 point bonus)
- Physical constraints prevent infeasible solutions (weight, dimension limits)
- Gap spacing between items is modeled in width constraints

### Database Schema
The system maintains dual schema definitions:
- SQLAlchemy models in `models.py` for ORM operations
- Prisma schema in `prisma/schema.prisma` for potential frontend integration
- Both schemas include inventory dimensions, promotional flags, and placement tracking

### Environment Configuration
Required environment variables in `.env`:
- Database connection parameters (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- DATABASE_URL and DIRECT_URL for Prisma
- GEMINI_API_KEY for potential AI integration

### Optimization Model Details
The Gurobi model uses binary variables:
- `x[i,j]`: item i placed on shelf j
- `y[i]`: item i is displayed
Objective maximizes total displayed items plus eye-level promotional bonuses.