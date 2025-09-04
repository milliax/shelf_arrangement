'use client'

import { useState, useEffect } from 'react'
import ShelfCard from '@/components/ShelfCard'
import ShelfVisualization from '@/components/ShelfVisualization'
import StatsOverview from '@/components/StatsOverview'
import { ShelfWithPlacements } from '@/types'

export default function Home() {
  const [shelves, setShelves] = useState<ShelfWithPlacements[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRunId, setSelectedRunId] = useState<string>('all')
  const [optimizationRuns, setOptimizationRuns] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetch('/api/shelves').then(res => res.json()),
      fetch('/api/optimization-runs').then(res => res.json())
    ])
    .then(([shelvesData, runsData]) => {
      setShelves(shelvesData)
      setOptimizationRuns(runsData)
      setLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
  }, [])

  const filteredShelves = selectedRunId === 'all' 
    ? shelves 
    : shelves.map(shelf => ({
        ...shelf,
        inventory_placements: shelf.inventory_placements.filter(
          placement => placement.optimization_run_id === selectedRunId
        )
      })).filter(shelf => shelf.inventory_placements.length > 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shelf data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Error loading data: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shelf Arrangement Dashboard</h1>
          <p className="text-gray-600">Visualize and analyze merchandise placement across shelves</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Optimization Run:
          </label>
          <select 
            value={selectedRunId}
            onChange={(e) => setSelectedRunId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <option value="all">All Runs</option>
            {optimizationRuns.map((run) => (
              <option key={run.run_id} value={run.run_id}>
                {run.run_id} - {run.status} ({new Date(run.created_at).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        <StatsOverview shelves={filteredShelves} />

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ShelfVisualization shelves={filteredShelves} />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Optimization Runs</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {optimizationRuns.map((run) => (
                <div 
                  key={run.run_id} 
                  className={`p-3 rounded border cursor-pointer transition-colors ${
                    selectedRunId === run.run_id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRunId(run.run_id)}
                >
                  <div className="font-medium">{run.run_id}</div>
                  <div className="text-sm text-gray-600">
                    Status: {run.status} | 
                    Objective: {run.total_objective?.toFixed(2) || 'N/A'} |
                    Time: {run.execution_time?.toFixed(2) || 'N/A'}s
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(run.created_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredShelves.map((shelf) => (
            <ShelfCard key={shelf.id} shelf={shelf} />
          ))}
        </div>

        {filteredShelves.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No shelves found for the selected criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
