import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const shelves = await prisma.shelves.findMany({
      include: {
        inventory_placements: {
          include: {
            inventories: true
          }
        }
      },
      orderBy: {
        shelf_id: 'asc'
      }
    })

    return NextResponse.json(shelves)
  } catch (error) {
    console.error('Error fetching shelves:', error)
    return NextResponse.json({ error: 'Failed to fetch shelves' }, { status: 500 })
  }
}