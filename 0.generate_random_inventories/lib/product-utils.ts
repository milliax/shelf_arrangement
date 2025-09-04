import { ProductDimensions } from "./types";

export function generatePrice(dimensions: ProductDimensions): number {
    const volume = dimensions.width * dimensions.height * dimensions.depth;
    const basePrice = volume * 0.02 + dimensions.weight * 0.01;
    const randomFactor = 0.5 + Math.random() * 2;
    return Number((basePrice * randomFactor).toFixed(2));
}

export function getRandomLocation(): string {
    const locations = [
        "Aisle 1 - Snacks", "Aisle 2 - Beverages", "Aisle 3 - Household", 
        "Aisle 4 - Personal Care", "Aisle 5 - Frozen", "Counter Display",
        "Checkout Lane", "Refrigerated Section", "Hot Food Section", "Pharmacy"
    ];
    return locations[Math.floor(Math.random() * locations.length)];
}

export function getRandomQuantity(): number {
    return Math.floor(Math.random() * 100) + 1;
}