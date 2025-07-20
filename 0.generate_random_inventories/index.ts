import dotenv from "dotenv";
import { generateRandomDimensions } from "./lib/dimensions";
import { generateProductInfo } from "./lib/gemini";
import { generatePrice, getRandomLocation, getRandomQuantity } from "./lib/product-utils";
import { createInventory, disconnectDatabase } from "./lib/database";
import { ConvenienceStoreProduct } from "./lib/types";

dotenv.config();

// Configuration - adjust these values as needed
const PRODUCTS_PER_SECOND = 2; // Rate limit: change this to adjust API call frequency
const BATCH_SIZE = 10; // Number of products per batch
const TOTAL_PRODUCTS = 10000; // Total number of products to generate

async function generateProducts(count: number = TOTAL_PRODUCTS, productsPerSecond: number = PRODUCTS_PER_SECOND) {
    console.log(`Starting generation of ${count} convenience store products...`);
    console.log(`Rate limit: ${productsPerSecond} products per second to avoid API limits`);
    
    const delayBetweenProducts = 1000 / productsPerSecond; // Delay between each API call
    const batchSize = BATCH_SIZE;
    const batches = Math.ceil(count / batchSize);
    
    let totalGenerated = 0;
    const startTime = Date.now();
    
    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
        const currentBatchSize = Math.min(batchSize, count - (batchIndex * batchSize));
        const products: ConvenienceStoreProduct[] = [];
        
        console.log(`\nGenerating batch ${batchIndex + 1}/${batches} (${currentBatchSize} products)...`);
        
        for (let i = 0; i < currentBatchSize; i++) {
            const dimensions = generateRandomDimensions();
            const productInfo = await generateProductInfo(dimensions);
            const price = generatePrice(dimensions);
            const quantity = getRandomQuantity();
            const location = getRandomLocation();
            
            products.push({
                name: productInfo.name,
                description: productInfo.description,
                quantity,
                location,
                width: dimensions.width,
                height: dimensions.height,
                depth: dimensions.depth,
                weight: dimensions.weight,
                price
            });
            
            totalGenerated++;
            
            // Rate limiting: wait 500ms between each API call
            if (i < currentBatchSize - 1) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenProducts));
            }
            
            // Progress update every 5 products
            if (totalGenerated % 5 === 0) {
                const elapsed = Date.now() - startTime;
                const rate = (totalGenerated / elapsed * 1000 * 60).toFixed(1); // products per minute
                console.log(`  Generated ${totalGenerated}/${count} products (${rate} products/min)`);
            }
        }
        
        console.log(`Saving batch ${batchIndex + 1} to database...`);
        
        // Save products to database
        for (const product of products) {
            await createInventory(product);
        }
        
        console.log(`✅ Batch ${batchIndex + 1} saved successfully`);
        
        // Small delay between batches
        if (batchIndex < batches - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    const totalTime = Date.now() - startTime;
    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    
    console.log(`\n🎉 Successfully generated ${count} convenience store products!`);
    console.log(`⏱️  Total time: ${minutes}m ${seconds}s`);
    console.log(`📊 Average rate: ${(count / totalTime * 1000 * 60).toFixed(1)} products/minute`);
    
    await disconnectDatabase();
}

if (require.main === module) {
    // You can customize these values:
    // generateProducts(5000, 1); // Generate 5000 products at 1 per second
    // generateProducts(1000, 5); // Generate 1000 products at 5 per second
    generateProducts().catch(console.error); // Use default values
}