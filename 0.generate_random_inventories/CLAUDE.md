# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript project for generating random inventory data and storing it in a PostgreSQL database using Prisma ORM. The project is part of a larger "shelf_arrangement" system and specifically handles inventory generation.

## Key Architecture

- **Database**: PostgreSQL with Prisma ORM
- **Generated Client**: Prisma client is generated to `generated/prisma/` directory (not the default location)
- **Database Schema**: Single `Inventory` model with dimensional data (width, height, depth) and basic inventory information
- **Database Connection**: Uses custom Prisma client path from `generated/prisma` with global instance pattern for development

## Development Commands

- **Package Manager**: pnpm (specified in package.json)
- **Install Dependencies**: `pnpm install`
- **TypeScript Compilation**: `npx tsc` (no build script configured)
- **Prisma Commands**:
  - Generate client: `npx prisma generate`
  - Database migrations: `npx prisma migrate dev`
  - Database reset: `npx prisma migrate reset`
  - View database: `npx prisma studio`

## Database Schema

The `Inventory` model contains:
- Basic info: id, name, description, quantity
- Dimensional data: width, height, depth (Float)
- Timestamps: createdAt, updatedAt

## Important Implementation Details

- Prisma client is imported from `../generated/prisma` not the standard `@prisma/client`
- Database connection uses global instance pattern for development environments
- The main script (index.ts) contains an incomplete `createInventory` function that needs implementation
- TypeScript is configured with strict mode and standard Node.js compatibility settings