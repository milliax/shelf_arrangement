import dotenv from "dotenv";
import { getRandomRealProduct, getRandomPrice } from "./lib/real-products";
import { getRandomLocation, getRandomQuantity } from "./lib/product-utils";
import { createInventory, testDatabaseConnection, disconnectDatabase } from "./lib/database";
import { ConvenienceStoreProduct } from "./lib/types";

dotenv.config();

async function testRealProducts() {
    console.log("=== Testing Real Product Generation ===\n");
    
    // Test database connection first
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
        console.log("❌ Database test failed");
        return;
    }
    console.log("✅ Database connection test passed\n");
    
    const testCount = 10;
    const productsPerSecond = 0.5; // Very slow rate
    const delayBetweenProducts = 1000 / productsPerSecond;
    
    console.log(`Testing generation of ${testCount} real products at ${productsPerSecond} products/second`);
    console.log(`Delay between products: ${delayBetweenProducts}ms (${delayBetweenProducts/1000} seconds)\n`);
    
    const startTime = Date.now();
    
    for (let i = 0; i < testCount; i++) {
        console.log(`Generating product ${i + 1}/${testCount}...`);
        
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
        
        const product: ConvenienceStoreProduct = {
            name: realProduct.name,
            description: realProduct.description,
            quantity,
            location,
            width,
            height,
            depth,
            weight,
            price
        };
        
        // Calculate ETA
        const elapsed = Date.now() - startTime;
        const currentRate = (i + 1) / elapsed * 1000; // products per second
        const remaining = testCount - (i + 1);
        const etaMs = remaining / currentRate * 1000;
        const etaMinutes = Math.floor(etaMs / 60000);
        const etaSeconds = Math.floor((etaMs % 60000) / 1000);
        const etaDisplay = etaMinutes > 0 ? `${etaMinutes}m ${etaSeconds}s` : `${etaSeconds}s`;
        
        console.log(`  🏪 ${product.name}`);
        console.log(`     📝 ${product.description}`);
        console.log(`     💰 $${product.price} | 📦 ${product.quantity} units`);
        console.log(`     📏 ${product.width}×${product.height}×${product.depth}cm, ${product.weight}g`);
        console.log(`     📍 ${product.location}`);
        console.log(`     ⏱️  ETA: ${etaDisplay} remaining (${remaining} products left)`);
        
        // Save to database
        await createInventory(product);
        console.log(`     ✅ Saved to database`);
        
        // Rate limiting delay (except for last product)
        if (i < testCount - 1) {
            console.log(`     ⏳ Waiting ${delayBetweenProducts/1000} seconds...\n`);
            await new Promise(resolve => setTimeout(resolve, delayBetweenProducts));
        }
    }
    
    const totalTime = Date.now() - startTime;
    const actualRate = (testCount / totalTime * 1000).toFixed(2);
    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    
    console.log(`\\n🎉 Test completed!`);
    console.log(`⏱️  Total time: ${minutes}m ${seconds}s`);
    console.log(`📊 Actual rate: ${actualRate} products/second`);
    console.log(`🎯 Target rate: ${productsPerSecond} products/second`);
    console.log(`🏪 All products are real convenience store items with brand names!`);
    
    await disconnectDatabase();
}

if (require.main === module) {
    testRealProducts().catch(console.error);
}