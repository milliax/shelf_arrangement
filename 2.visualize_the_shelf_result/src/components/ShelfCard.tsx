'use client'

import { ShelfWithPlacements } from '@/types'

interface ShelfCardProps {
  shelf: ShelfWithPlacements
}

export default function ShelfCard({ shelf }: ShelfCardProps) {
  const totalItems = shelf.inventory_placements.reduce((sum, placement) => sum + placement.inventories.quantity, 0)
  const totalValue = shelf.inventory_placements.reduce((sum, placement) => 
    sum + (placement.inventories.price * placement.inventories.quantity), 0
  )
  const averageScore = shelf.inventory_placements.length > 0 
    ? shelf.inventory_placements.reduce((sum, p) => sum + (p.placement_score || 0), 0) / shelf.inventory_placements.length
    : 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Shelf #{shelf.shelf_id}</h3>
        <div className="text-sm text-gray-500">
          {shelf.position_x !== null && shelf.position_y !== null && (
            <span>Position: ({shelf.position_x}, {shelf.position_y})</span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Dimensions (W×H×D)</div>
          <div className="font-medium">{shelf.width} × {shelf.height} × {shelf.depth}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-600">Eye Level</div>
          <div className="font-medium">{shelf.eye_level || 'N/A'}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{shelf.inventory_placements.length}</div>
          <div className="text-sm text-gray-600">Products</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalItems}</div>
          <div className="text-sm text-gray-600">Total Items</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">${totalValue.toFixed(2)}</div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
      </div>

      {averageScore > 0 && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Average Placement Score</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(averageScore * 10, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{averageScore.toFixed(3)}</div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Merchandise:</h4>
        <div className="max-h-40 overflow-y-auto space-y-1">
          {shelf.inventory_placements.map((placement) => (
            <div key={placement.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
              <span className="font-medium">{placement.inventories.name}</span>
              <div className="flex gap-2">
                <span className="text-gray-600">Qty: {placement.inventories.quantity}</span>
                <span className="text-green-600">${placement.inventories.price}</span>
                {placement.placement_score && (
                  <span className="text-blue-600">Score: {placement.placement_score.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}