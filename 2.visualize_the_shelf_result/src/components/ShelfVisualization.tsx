'use client'

import { ShelfWithPlacements } from '@/types'

interface ShelfVisualizationProps {
  shelves: ShelfWithPlacements[]
}

export default function ShelfVisualization({ shelves }: ShelfVisualizationProps) {
  if (shelves.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No shelves found</p>
      </div>
    )
  }

  const maxX = Math.max(...shelves.filter(s => s.position_x !== null).map(s => s.position_x!))
  const maxY = Math.max(...shelves.filter(s => s.position_y !== null).map(s => s.position_y!))
  const minX = Math.min(...shelves.filter(s => s.position_x !== null).map(s => s.position_x!))
  const minY = Math.min(...shelves.filter(s => s.position_y !== null).map(s => s.position_y!))

  const scaleX = 800 / (maxX - minX || 1)
  const scaleY = 600 / (maxY - minY || 1)
  const scale = Math.min(scaleX, scaleY, 50)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Store Layout</h3>
      <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ height: '600px' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 600">
          {shelves.map((shelf) => {
            if (shelf.position_x === null || shelf.position_y === null) return null
            
            const x = (shelf.position_x - minX) * scale + 50
            const y = (shelf.position_y - minY) * scale + 50
            const width = shelf.width * scale * 0.1
            const height = shelf.depth * scale * 0.1
            
            const totalValue = shelf.inventory_placements.reduce((sum, p) => 
              sum + (p.inventories.price * p.inventories.quantity), 0
            )
            
            const color = totalValue > 1000 ? '#ef4444' : totalValue > 500 ? '#f59e0b' : '#3b82f6'
            
            return (
              <g key={shelf.id}>
                <rect
                  x={x}
                  y={y}
                  width={Math.max(width, 20)}
                  height={Math.max(height, 20)}
                  fill={color}
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <text
                  x={x + Math.max(width, 20) / 2}
                  y={y + Math.max(height, 20) / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  {shelf.shelf_id}
                </text>
              </g>
            )
          })}
        </svg>
        
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow">
          <h4 className="font-medium text-sm mb-2">Value Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>&lt; $500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>$500 - $1000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>&gt; $1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}