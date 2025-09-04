export interface ShelfWithPlacements {
  id: number
  shelf_id: number
  width: number
  height: number
  depth: number
  eye_level: number | null
  position_x: number | null
  position_y: number | null
  inventory_placements: {
    id: number
    inventory_id: number
    slot_id: number
    placement_score: number | null
    optimization_run_id: string | null
    inventories: {
      id: number
      name: string
      description: string
      quantity: number
      width: number
      height: number
      depth: number
      price: number
      weight: number
    }
  }[]
}

export interface InventoryItem {
  id: number
  name: string
  description: string
  quantity: number
  width: number
  height: number
  depth: number
  price: number
  weight: number
}