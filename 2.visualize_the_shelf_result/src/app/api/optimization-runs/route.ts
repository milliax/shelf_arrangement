import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const runs = await prisma.optimization_runs.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(runs)
  } catch (error) {
    console.error('Error fetching optimization runs:', error)
    return NextResponse.json({ error: 'Failed to fetch optimization runs' }, { status: 500 })
  }
}