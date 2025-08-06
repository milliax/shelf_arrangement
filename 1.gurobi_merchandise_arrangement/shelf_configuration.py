""" set up shelf configuration with width, height, length, and maximum weight accepted """
from dataclasses import dataclass


@dataclass
class ShelfConfiguration:
    def __init__(self, width, height, depth, max_weight):
        self.width = width
        self.height = height
        self.depth = depth
        self.max_weight = max_weight

    def __repr__(self):
        return (f"ShelfConfiguration(width={self.width}, height={self.height}, "
                f"length={self.depth}, max_weight={self.max_weight})")
