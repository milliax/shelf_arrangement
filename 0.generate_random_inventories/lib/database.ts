import { prisma } from "./prisma";
import { ConvenienceStoreProduct } from "./types";

export async function createInventory(product: ConvenienceStoreProduct) {
    return await prisma.inventory.create({
        data: {
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            width: product.width,
            height: product.height,
            depth: product.depth,
            weight: product.weight,
            price: product.price
        }
    });
}

export async function createManyInventories(products: ConvenienceStoreProduct[]) {
    return await prisma.inventory.createMany({
        data: products.map(product => ({
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            width: product.width,
            height: product.height,
            depth: product.depth,
            weight: product.weight,
            price: product.price
        }))
    });
}

export async function testDatabaseConnection(): Promise<boolean> {
    try {
        await prisma.$connect();
        return true;
    } catch (error) {
        console.error("Database connection failed:", error);
        return false;
    }
}

export async function disconnectDatabase(): Promise<void> {
    await prisma.$disconnect();
}