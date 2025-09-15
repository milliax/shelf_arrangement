import { prisma } from '@/lib/prisma'

import { NextResponse } from 'next/server'

export const GET = async () => {
    try{

        const merchandiseNotPicked = await prisma.inventory.findMany({
            where: {
                InventoryPlacement: {
                    none: {}
                }
            }
        })

        return NextResponse.json(merchandiseNotPicked)

    }catch(error){
        console.error('Error fetching merchandise not picked:', error)
    }

}