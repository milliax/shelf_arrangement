import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const shelves = await prisma.shelves.findMany({
            include: {
                InventoryPlacement: {
                    include: {
                        inventory: true
                    },
                },
            },
        })

        return NextResponse.json(shelves)
    } catch (error) {
        console.error('Error fetching shelves:', error)
        return NextResponse.json({ error: 'Failed to fetch shelves' }, { status: 500 })
    }
}