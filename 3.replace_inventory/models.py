from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()


class Inventory(Base):
    __tablename__ = 'Inventory'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    depth = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    createdAt = Column(DateTime, nullable=False, default=datetime.utcnow)
    updatedAt = Column(DateTime, nullable=False,
                        default=datetime.utcnow, onupdate=datetime.utcnow)

    isPromoted = Column(Boolean, nullable=True, default=False)
    salesRate = Column(Float, nullable=True, default=0.0)

    # Relationship
    placements = relationship('InventoryPlacement', back_populates='inventory')


class Shelves(Base):
    __tablename__ = 'shelves'

    id = Column(Integer, primary_key=True, autoincrement=True)
    shelf_id = Column(Integer, unique=True, nullable=False)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    depth = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    # gap = Column(Float, nullable=True, default=0.25)
    eye_level = Column(Boolean, nullable=True)
    created_at = Column(DateTime, nullable=True, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True,
                        default=datetime.utcnow, onupdate=datetime.utcnow)

    # isPromoted = Column(Boolean, nullable=True, default=False)

    # Relationship
    placements = relationship('InventoryPlacement', back_populates='shelf')


class InventoryPlacement(Base):
    __tablename__ = 'InventoryPlacement'

    id = Column(String, primary_key=True, default=lambda: str(
        uuid.uuid4()))  # Generate UUID as string
    inventoryId = Column(Integer, ForeignKey('Inventory.id'), nullable=False)
    shelfId = Column(Integer, ForeignKey('shelves.id'), nullable=False)

    # Relationships
    inventory = relationship('Inventory', back_populates='placements')
    shelf = relationship('Shelves', back_populates='placements')

    order = Column(Integer, nullable=False, default=0)

class OptimizationRun(Base):
    __tablename__ = 'optimization_runs'

    id = Column(Integer, primary_key=True, autoincrement=True)
    run_id = Column(String(100), unique=True, nullable=False)
    status = Column(String(50))
    total_objective = Column(Float)
    execution_time = Column(Float)
    parameters = Column(String)
    created_at = Column(DateTime)
    completed_at = Column(DateTime)

    def __repr__(self):
        return f"<OptimizationRun(run_id='{self.run_id}', status='{self.status}')>"


class ShelfConfiguration(Base):
    __tablename__ = 'shelf_configurations'

    id = Column(Integer, primary_key=True, autoincrement=True)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    depth = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    gap = Column(Float, default=0.25)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow,
                        onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<ShelfConfiguration(id={self.id}, dimensions={self.width}x{self.height}x{self.depth}, weight={self.weight})>"
