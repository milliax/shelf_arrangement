""" set up shelf configuration with width, height, length, and maximum weight accepted """
from dataclasses import dataclass, field


@dataclass
class ShelfConfiguration:
    width: float
    height: float
    depth: float
    weight: float
    gap: float = field(default=0.25)

    def __repr__(self):
        return (f"ShelfConfiguration(width={self.width}, height={self.height}, "
                f"depth={self.depth}, max_weight={self.weight}, gap={self.gap})")
