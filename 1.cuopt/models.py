from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    width = Column(Float, nullable=False)  # cm
    depth = Column(Float, nullable=False)  # cm
    height = Column(Float, nullable=False)  # cm
    margin = Column(Float, nullable=False)  # profit margin (0-1)
    sales_frequency = Column(Float, nullable=False)  # sales frequency (0-1)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with placements
    placements = relationship("ProductPlacement", back_populates="product")
    
    def __repr__(self):
        return f"<Product(id={self.product_id}, name='{self.name}', category='{self.category}')>"

class Shelf(Base):
    __tablename__ = 'shelves'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    shelf_id = Column(Integer, unique=True, nullable=False)
    width = Column(Float, nullable=False)  # cm
    height = Column(Float, nullable=False)  # cm
    depth = Column(Float, nullable=False)  # cm
    eye_level = Column(Integer, default=0)  # 1 if eye-level, 0 otherwise
    position_x = Column(Float, default=0.0)  # x coordinate in store
    position_y = Column(Float, default=0.0)  # y coordinate in store
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with placements
    placements = relationship("ProductPlacement", back_populates="shelf")
    
    def __repr__(self):
        return f"<Shelf(id={self.shelf_id}, dimensions={self.width}x{self.height}x{self.depth})>"

class ProductPlacement(Base):
    __tablename__ = 'product_placements'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    shelf_id = Column(Integer, ForeignKey('shelves.id'), nullable=False)
    slot_id = Column(Integer, nullable=False)  # slot position on shelf
    placement_score = Column(Float)  # optimization score
    optimization_run_id = Column(String(100))  # to track different optimization runs
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    product = relationship("Product", back_populates="placements")
    shelf = relationship("Shelf", back_populates="placements")
    
    def __repr__(self):
        return f"<ProductPlacement(product_id={self.product_id}, shelf_id={self.shelf_id}, slot={self.slot_id})>"

class OptimizationRun(Base):
    __tablename__ = 'optimization_runs'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    run_id = Column(String(100), unique=True, nullable=False)
    status = Column(String(50), default='pending')  # pending, running, completed, failed
    total_objective = Column(Float)
    execution_time = Column(Float)  # seconds
    parameters = Column(Text)  # JSON string of optimization parameters
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    def __repr__(self):
        return f"<OptimizationRun(run_id='{self.run_id}', status='{self.status}')>"