# Tests

This directory contains test files for the shelf optimization project.

## Test Files

### `test_db_connection.py`
Comprehensive database connection testing script that validates:

- **Environment Configuration**: Checks .env file and environment variables
- **SQLAlchemy Connection**: Tests database connection, table creation, and data operations
- **Prisma Connection**: Tests Prisma client connection and operations
- **Database Schema**: Validates all database tables and models

## Running Tests

### Database Connection Test
```bash
# Run the database connection test
python tests/test_db_connection.py
```

This will test both SQLAlchemy and Prisma connections and provide detailed feedback on any issues.

### Prerequisites
1. Ensure PostgreSQL is running and accessible
2. Configure `.env` file with database credentials
3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. For Prisma tests, generate the client:
   ```bash
   prisma generate
   ```

## Test Output
The database connection test provides:
- ✅ Success indicators for working components
- ❌ Error messages with troubleshooting tips
- 📋 Summary of database contents
- 💡 Configuration guidance

Example output:
```
🧪 Database Connection Test Suite
==================================================
🔧 Testing Environment Configuration...
  ✅ Found .env
  ✅ DATABASE_URL: ***configured***

🔧 Testing SQLAlchemy Connection...
  ✅ Database initialized successfully
  ✅ Retrieved 8 products
  ✅ Retrieved 3 shelves

🎉 All database connections working!
```