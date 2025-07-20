import { ProductDimensions } from "./types";

export function generateRandomDimensions(): ProductDimensions {
    const productTypes = [
        // Small items (candy, gum, etc.)
        { widthRange: [2, 8], heightRange: [1, 4], depthRange: [0.5, 3], weightRange: [10, 100] },
        // Medium items (bottles, cans, boxes)
        { widthRange: [5, 15], heightRange: [8, 25], depthRange: [5, 15], weightRange: [100, 800] },
        // Large items (bags, large containers)
        { widthRange: [15, 35], heightRange: [15, 40], depthRange: [8, 25], weightRange: [500, 2000] },
        // Flat items (magazines, cards)
        { widthRange: [10, 25], heightRange: [15, 30], depthRange: [0.2, 2], weightRange: [20, 200] },
        // Tall thin items (drinks, tubes)
        { widthRange: [4, 8], heightRange: [15, 35], depthRange: [4, 8], weightRange: [200, 600] }
    ];
    
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
    
    return {
        width: Number((Math.random() * (productType.widthRange[1] - productType.widthRange[0]) + productType.widthRange[0]).toFixed(1)),
        height: Number((Math.random() * (productType.heightRange[1] - productType.heightRange[0]) + productType.heightRange[0]).toFixed(1)),
        depth: Number((Math.random() * (productType.depthRange[1] - productType.depthRange[0]) + productType.depthRange[0]).toFixed(1)),
        weight: Number((Math.random() * (productType.weightRange[1] - productType.weightRange[0]) + productType.weightRange[0]).toFixed(0))
    };
}