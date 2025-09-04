import dotenv from "dotenv";
import { generateRandomDimensions } from "./lib/dimensions";
import { generateProductInfo } from "./lib/gemini";
import { testDatabaseConnection, disconnectDatabase } from "./lib/database";

dotenv.config();

async function testGeminiAPI() {
    console.log("Testing Gemini API connection...");
    
    const dimensions = generateRandomDimensions();
    console.log("Generated dimensions:", dimensions);
    
    try {
        const productInfo = await generateProductInfo(dimensions);
        console.log("Generated product info:", productInfo);
        return productInfo;
    } catch (error) {
        console.error("Gemini API error:", error);
        return null;
    }
}

async function testDatabaseConnectionWrapper() {
    console.log("Testing database connection...");
    
    const result = await testDatabaseConnection();
    if (result) {
        console.log("Database connection successful");
    }
    return result;
}

async function runTests() {
    console.log("=== Running Tests ===\n");
    
    // Test database connection
    const dbConnected = await testDatabaseConnectionWrapper();
    if (!dbConnected) {
        console.log("❌ Database test failed");
        return;
    }
    console.log("✅ Database connection test passed\n");
    
    // Test Gemini API
    const geminiResult = await testGeminiAPI();
    if (!geminiResult) {
        console.log("❌ Gemini API test failed");
        return;
    }
    console.log("✅ Gemini API test passed\n");
    
    console.log("=== All tests passed! ===");
    console.log("You can now run the full generation with: npx tsx index.ts");
    
    await disconnectDatabase();
}

if (require.main === module) {
    runTests().catch(console.error);
}