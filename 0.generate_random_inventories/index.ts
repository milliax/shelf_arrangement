import dotenv from "dotenv";
import { getRandomRealProduct, getRandomPrice } from "./lib/real-products";
import { getRandomLocation, getRandomQuantity } from "./lib/product-utils";
import { createManyInventories, disconnectDatabase } from "./lib/database";
import { ConvenienceStoreProduct } from "./lib/types";

dotenv.config();

// Configuration - adjust these values as needed
const PRODUCTS_PER_SECOND = 0.5; // Rate limit: 0.5 = one product every 2 seconds (very conservative)
const BATCH_SIZE = 5; // Number of products per batch (smaller for slower processing)
const TOTAL_PRODUCTS = 10000; // Total number of products to generate

async function generateProducts(count: number = TOTAL_PRODUCTS, productsPerSecond: number = PRODUCTS_PER_SECOND) {
    console.log(`Starting generation of ${count} convenience store products...`);
    console.log(`Rate limit: ${productsPerSecond} products per second for optimal database performance`);
    
    const delayBetweenProducts = 1000 / productsPerSecond; // Delay between each product generation
    const batchSize = BATCH_SIZE;
    const batches = Math.ceil(count / batchSize);
    
    let totalGenerated = 0;
    const startTime = Date.now();
    
    for (let batchIndex = 0; batchIndex < batches; batchIndex++) {
        const currentBatchSize = Math.min(batchSize, count - (batchIndex * batchSize));
        const products: ConvenienceStoreProduct[] = [];
        
        console.log(`\nGenerating batch ${batchIndex + 1}/${batches} (${currentBatchSize} products)...`);
        
        for (let i = 0; i < currentBatchSize; i++) {
            const realProduct = getRandomRealProduct();
            
            // Add small random variations to dimensions for realism (±5%)
            const variationFactor = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
            const width = Number((realProduct.width * variationFactor).toFixed(1));
            const height = Number((realProduct.height * variationFactor).toFixed(1));
            const depth = Number((realProduct.depth * variationFactor).toFixed(1));
            const weight = Number((realProduct.weight * variationFactor).toFixed(0));
            
            const price = getRandomPrice(realProduct.priceRange);
            const quantity = getRandomQuantity();
            const location = getRandomLocation();
            
            products.push({
                name: realProduct.name,
                description: realProduct.description,
                quantity,
                location,
                width,
                height,
                depth,
                weight,
                price
            });
            
            totalGenerated++;
            
            // Rate limiting: gentle delay for database performance
            if (i < currentBatchSize - 1) {
                await new Promise(resolve => setTimeout(resolve, delayBetweenProducts));
            }
            
            // Progress update every 5 products
            if (totalGenerated % 5 === 0) {
                const elapsed = Date.now() - startTime;
                const currentRate = totalGenerated / elapsed * 1000; // products per second
                const remaining = count - totalGenerated;
                const etaMs = remaining / currentRate * 1000;
                const etaMinutes = Math.floor(etaMs / 60000);
                const etaSeconds = Math.floor((etaMs % 60000) / 1000);
                const etaHours = Math.floor(etaMinutes / 60);
                const etaMinutesRemainder = etaMinutes % 60;
                
                let etaDisplay;
                if (etaHours > 0) {
                    etaDisplay = `${etaHours}h ${etaMinutesRemainder}m`;
                } else if (etaMinutes > 0) {
                    etaDisplay = `${etaMinutes}m ${etaSeconds}s`;
                } else {
                    etaDisplay = `${etaSeconds}s`;
                }
                
                const ratePerMin = (currentRate * 60).toFixed(1);
                const progressPercent = (totalGenerated / count * 100).toFixed(1);
                
                console.log(`  📊 ${totalGenerated}/${count} products (${progressPercent}%) | 🚀 ${ratePerMin}/min | ⏱️ ETA: ${etaDisplay}`);
            }
        }
        
        console.log(`Saving batch ${batchIndex + 1} to database...`);
        
        // Save products to database using batch insert
        await createManyInventories(products);
        
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