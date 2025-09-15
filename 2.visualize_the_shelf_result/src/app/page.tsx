'use client'

import React, { useState, useEffect, useRef } from 'react'
// import ShelfCard from '@/components/ShelfCard'
import { ShelfWithPlacements } from '@/types'
import { Inventory } from '../../generated/prisma'
import clsx from 'clsx'

export default function Home() {
    const [shelves, setShelves] = useState<ShelfWithPlacements[]>([])
    const [loading, setLoading] = useState(true)

    const [merchandiseNotSelected, setMerchandiseNotSelected] = useState<Inventory[]>([])

    const fetchShelves = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/shelves")
            if (!response.ok) {
                throw new Error('Failed to fetch shelves')
            }
            const data = await response.json()
            console.log(data)
            setShelves(data)
        } catch (err: any) {
            console.error('Error fetching shelves:', err)
            // setError(err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const fetchMerchandiseNotPicked = async () => {
        const response = await fetch("/api/merchandiseNotPicked")
        if (!response.ok) {
            throw new Error('Failed to fetch merchandise not picked')
        }
        const data = await response.json()
        console.log(data)
        setMerchandiseNotSelected(data)
    }

    useEffect(() => {
        fetchShelves()
        fetchMerchandiseNotPicked()
    }, [])

    return (
        <div>
            {shelves.length > 0 ? (
                shelves.map((shelf) => (
                    <ShelfCard key={shelf.id} shelf={shelf} />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {loading ? (
                        <p className="text-gray-500">Loading shelves...</p>
                    ) : (
                        <p className="text-red-500">No shelves found.</p>
                    )}
                </div>
            )}

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Merchandise Not Selected</h2>
                {merchandiseNotSelected.length > 0 ? (
                    <div className='flex flex-col overflow-x-auto'>
                        <div className="flex flex-row gap-4">
                            {merchandiseNotSelected.map((item) => (
                                <Merchandise key={item.id} merchandise={item} />
                            ))}
                        </div>

                        <div className="flex flex-row gap-4">
                            {merchandiseNotSelected.map((item) => (
                                <MerchandiseDetail key={item.id} merchandise={item} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">All merchandise has been placed on shelves.</p>
                )}
            </div>
        </div>
    )
}


const ShelfCard = ({ shelf }: { shelf: any }) => {

    console.log("shelf data")
    console.log(shelf)

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 gap-1">
                <span className='font-bold text-2xl'>Shelf ID: {shelf.id}</span>
                <span className='font-base text-base'> dimensions: {shelf.width} x {shelf.height} x {shelf.depth}, eye-level: {shelf.eye_level ? 'Yes' : 'No'}</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-row items-end gap-3 px-5 border-b">
                    {shelf.InventoryPlacement && shelf.InventoryPlacement.length > 0 ? (
                        shelf.InventoryPlacement.map((placement: any) => (
                            <Merchandise key={placement.id} merchandise={placement.inventory} />
                        ))
                    ) : (
                        <p className="text-gray-500">No merchandise on this shelf.</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-row items-end gap-3 px-5 border-b ">
                    {shelf.InventoryPlacement && shelf.InventoryPlacement.length > 0 ? (
                        shelf.InventoryPlacement.map((placement: any) => (
                            <MerchandiseDetail key={placement.id} merchandise={placement.inventory} />
                        ))
                    ) : (
                        <p className="text-gray-500">No merchandise on this shelf.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Merchandise = ({ merchandise }: { merchandise: Inventory }) => {
    // return the size the merchandise occupies on the shelf
    const divRef = useRef<HTMLDivElement | null>(null);

    if (!merchandise) {
        return <div>Invalid merchandise data</div>
    }

    return (
        <div className={clsx("border p-2 rounded bg-white shadow mb-1",
            merchandise.isPromoted ? 'border-red-500' : 'border-gray-300',
            // add minimum width
        )} style={{ width: `${merchandise.width * 10 < 100 ? 100 : merchandise.width * 10}px`, height: `${(merchandise.height * 50 < 100 ? merchandise.height * 50 : 100)}px` }}>
            {/* // )} ref={divRef}> */}
            {/* set width according to merchandise.width */}
            <h3 className="font-semibold text-center">{merchandise.name}</h3>
        </div >
    )
}

const MerchandiseDetail = ({ merchandise }: { merchandise: Inventory }) => {
    // return the size the merchandise occupies on the shelf

    if (!merchandise) {
        return <div>Invalid merchandise data</div>
    }

    return (
        <div className={clsx("text-center",
            // `${`w-[${merchandise.width}rem]`} h-[${merchandise.height}rem]`,
            // 'w-40', // set a fixed size for demo purpose
            // "w-[5.51rem]"
            // )} style={{ width: `${merchandise.width / 10}rem`, height: `${merchandise.height / 10}rem` }}>
        )} style={{ width: `${merchandise.width * 10 < 100 ? 100 : merchandise.width * 10}px` }}>
            {/* // )} ref={divRef}> */}
            {/* set width according to merchandise.width */}
            {/* <h3 className="font-semibold">{merchandise.name}</h3> */}
            <p className='text-sm'>W:{merchandise.width}</p>
            <p className='text-sm'>H:{merchandise.height}</p>
            <p className='text-sm'>W:{merchandise.weight}</p>
            <p className='text-sm'>P*S:{Math.round(merchandise.price * (merchandise?.salesRate ?? 0))}</p>

            {/* <p>Depth: {merchandise.depth} cm</p>
            <p>Weight: {merchandise.weight} g</p>
            <p>Price: ${merchandise.price}</p>
            <p>Quantity: {merchandise.quantity}</p> */}
        </div >
    )
}