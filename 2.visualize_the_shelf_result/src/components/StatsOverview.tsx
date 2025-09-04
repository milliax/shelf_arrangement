'use client'

import { ShelfWithPlacements } from '@/types'

interface StatsOverviewProps {
  shelves: ShelfWithPlacements[]
}

export default function StatsOverview({ shelves }: StatsOverviewProps) {
  const totalShelves = shelves.length
  const totalProducts = shelves.reduce((sum, shelf) => sum + shelf.inventory_placements.length, 0)
  const totalItems = shelves.reduce((sum, shelf) => 
    sum + shelf.inventory_placements.reduce((itemSum, placement) => itemSum + placement.inventories.quantity, 0), 0
  )
  const totalValue = shelves.reduce((sum, shelf) => 
    sum + shelf.inventory_placements.reduce((valueSum, placement) => 
      valueSum + (placement.inventories.price * placement.inventories.quantity), 0
    ), 0
  )

  const averageItemsPerShelf = totalShelves > 0 ? (totalItems / totalShelves).toFixed(1) : '0'
  const averageValuePerShelf = totalShelves > 0 ? (totalValue / totalShelves).toFixed(2) : '0'

  const shelvesWithScores = shelves.filter(shelf => 
    shelf.inventory_placements.some(p => p.placement_score !== null)
  )
  const averageScore = shelvesWithScores.length > 0 
    ? shelvesWithScores.reduce((sum, shelf) => {
        const shelfAvgScore = shelf.inventory_placements
          .filter(p => p.placement_score !== null)
          .reduce((scoreSum, p) => scoreSum + p.placement_score!, 0) / 
          shelf.inventory_placements.filter(p => p.placement_score !== null).length
        return sum + shelfAvgScore
      }, 0) / shelvesWithScores.length
    : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-blue-600">{totalShelves}</div>
        <div className="text-sm text-gray-600">Total Shelves</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-green-600">{totalProducts}</div>
        <div className="text-sm text-gray-600">Unique Products</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-purple-600">{totalItems}</div>
        <div className="text-sm text-gray-600">Total Items</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-red-600">${totalValue.toFixed(0)}</div>
        <div className="text-sm text-gray-600">Total Value</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-yellow-600">{averageItemsPerShelf}</div>
        <div className="text-sm text-gray-600">Avg Items/Shelf</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-3xl font-bold text-indigo-600">{averageScore.toFixed(2)}</div>
        <div className="text-sm text-gray-600">Avg Score</div>
      </div>
    </div>
  )
}