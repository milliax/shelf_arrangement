import dotenv from "dotenv";
import { generateRandomDimensions } from "./lib/dimensions";
import { generateProductInfo } from "./lib/gemini";
import { generatePrice, getRandomLocation, getRandomQuantity } from "./lib/product-utils";
import { createInventory, testDatabaseConnection, disconnectDatabase } from "./lib/database";
import { ConvenienceStoreProduct } from "./lib/types";

dotenv.config();

async function testRateLimit() {
    console.log("=== Testing Rate-Limited Generation ===\n");
    
    // Test database connection first
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
        console.log("❌ Database test failed");
        return;
    }
    console.log("✅ Database connection test passed\n");
    
    const testCount = 5;
    const productsPerSecond = 2;
    const delayBetweenProducts = 1000 / productsPerSecond;
    
    console.log(`Testing generation of ${testCount} products at ${productsPerSecond} products/second`);
    console.log(`Delay between products: ${delayBetweenProducts}ms\n`);
    
    const startTime = Date.now();
    
    for (let i = 0; i < testCount; i++) {
        console.log(`Generating product ${i + 1}/${testCount}...`);
        
        const dimensions = generateRandomDimensions();
        const productInfo = await generateProductInfo(dimensions);
        const price = generatePrice(dimensions);
        const quantity = getRandomQuantity();
        const location = getRandomLocation();
        
        const product: ConvenienceStoreProduct = {
            name: productInfo.name,
            description: productInfo.description,
            quantity,
            location,
            width: dimensions.width,
            height: dimensions.height,
            depth: dimensions.depth,
            weight: dimensions.weight,
            price
        };
        
        console.log(`  📦 ${product.name} - $${product.price}`);
        
        // Save to database
        await createInventory(product);
        console.log(`  ✅ Saved to database`);
        
        // Rate limiting delay (except for last product)
        if (i < testCount - 1) {
            console.log(`  ⏳ Waiting ${delayBetweenProducts}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayBetweenProducts));
        }
    }
    
    const totalTime = Date.now() - startTime;
    const actualRate = (testCount / totalTime * 1000).toFixed(2);
    
    console.log(`\n🎉 Test completed!`);
    console.log(`⏱️  Total time: ${totalTime}ms`);
    console.log(`📊 Actual rate: ${actualRate} products/second`);
    console.log(`🎯 Target rate: ${productsPerSecond} products/second`);
    
    await disconnectDatabase();
}

if (require.main === module) {
    testRateLimit().catch(console.error);
}