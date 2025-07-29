from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Inventory(Base):
    __tablename__ = 'Inventory'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    depth = Column(Float, nullable=False)
    price = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow, name='createdAt')
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, name='updatedAt')
    
    # Relationship with placements
    inventoryPlacements = relationship("InventoryPlacement", back_populates="inventories")
    
    def __repr__(self):
        return f"<Inventory(id={self.id}, name='{self.name}', description='{self.description}')>"

class Shelf(Base):
    __tablename__ = 'shelves'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    shelf_id = Column(Integer, unique=True, nullable=False)
    width = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    depth = Column(Float, nullable=False)
    eye_level = Column(Integer)
    position_x = Column(Float)
    position_y = Column(Float)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    # Relationship with placements
    inventory_placements = relationship("InventoryPlacement", back_populates="shelves")
    
    def __repr__(self):
        return f"<Shelf(id={self.shelf_id}, dimensions={self.width}x{self.height}x{self.depth})>"

class InventoryPlacement(Base):
    __tablename__ = 'InventoryPlacement'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    inventory_id = Column(Integer, ForeignKey('Inventory.id'), nullable=False)
    shelf_id = Column(Integer, ForeignKey('shelves.id'), nullable=False)
    slot_id = Column(Integer, nullable=False)
    placement_score = Column(Float)
    optimization_run_id = Column(String(100))
    created_at = Column(DateTime)
    
    # Relationships
    inventories = relationship("Inventory", back_populates="inventoryPlacements")
    shelves = relationship("Shelf", back_populates="inventory_placements")
    
    def __repr__(self):
        return f"<InventoryPlacement(inventory_id={self.inventory_id}, shelf_id={self.shelf_id}, slot={self.slot_id})>"

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