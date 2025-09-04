import { GoogleGenerativeAI } from "@google/generative-ai";
import { ProductDimensions } from "./types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateProductInfo(dimensions: ProductDimensions): Promise<{name: string, description: string}> {
    const prompt = `Generate a realistic convenience store product name and description based on these dimensions:
    Width: ${dimensions.width}cm, Height: ${dimensions.height}cm, Depth: ${dimensions.depth}cm, Weight: ${dimensions.weight}g
    
    The product should be something typically found in a convenience store like snacks, drinks, household items, personal care, etc.
    
    Respond in this exact JSON format:
    {
        "name": "Product Name",
        "description": "Brief product description"
    }`;
    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                name: parsed.name || "Generic Product",
                description: parsed.description || "Convenience store item"
            };
        }
    } catch (error) {
        console.log(`Gemini API error, using fallback: ${error}`);
    }
    
    return generateFallbackProduct(dimensions);
}

export function generateFallbackProduct(dimensions: ProductDimensions): {name: string, description: string} {
    const { width, height, depth, weight } = dimensions;
    const volume = width * height * depth;
    
    if (volume < 50 && weight < 100) {
        return { name: "Small Candy Pack", description: "Assorted small candy or gum pack" };
    } else if (height > 20 && width < 10) {
        return { name: "Beverage Bottle", description: "Refreshing drink bottle" };
    } else if (volume > 1000) {
        return { name: "Large Snack Bag", description: "Family-size snack bag" };
    } else if (depth < 2) {
        return { name: "Magazine", description: "Popular magazine or publication" };
    } else {
        return { name: "Convenience Item", description: "General convenience store product" };
    }
}