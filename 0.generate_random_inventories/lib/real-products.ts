export interface RealProduct {
    name: string;
    description: string;
    category: string;
    width: number;   // cm
    height: number;  // cm
    depth: number;   // cm
    weight: number;  // grams
    priceRange: [number, number]; // min, max price
}

export const REAL_CONVENIENCE_STORE_PRODUCTS: RealProduct[] = [
    // BEVERAGES - SOFT DRINKS
    {
        name: "Coca-Cola Classic 12oz Can",
        description: "Refreshing cola soft drink in aluminum can",
        category: "Beverages",
        width: 6.5, height: 12.3, depth: 6.5, weight: 355,
        priceRange: [1.25, 2.50]
    },
    {
        name: "Pepsi Cola 12oz Can",
        description: "Cola soft drink with bold taste",
        category: "Beverages", 
        width: 6.5, height: 12.3, depth: 6.5, weight: 355,
        priceRange: [1.25, 2.50]
    },
    {
        name: "Dr Pepper 12oz Can",
        description: "Unique blend of 23 flavors",
        category: "Beverages",
        width: 6.5, height: 12.3, depth: 6.5, weight: 355,
        priceRange: [1.25, 2.50]
    },
    {
        name: "Sprite 12oz Can",
        description: "Lemon-lime flavored soda",
        category: "Beverages",
        width: 6.5, height: 12.3, depth: 6.5, weight: 355,
        priceRange: [1.25, 2.50]
    },
    {
        name: "Mountain Dew 12oz Can",
        description: "Citrus flavored soda with caffeine",
        category: "Beverages",
        width: 6.5, height: 12.3, depth: 6.5, weight: 355,
        priceRange: [1.25, 2.50]
    },

    // BEVERAGES - BOTTLES
    {
        name: "Coca-Cola 20oz Bottle",
        description: "Classic cola in plastic bottle",
        category: "Beverages",
        width: 6.4, height: 22.9, depth: 6.4, weight: 590,
        priceRange: [2.25, 3.50]
    },
    {
        name: "Aquafina Water 16.9oz",
        description: "Pure drinking water",
        category: "Beverages",
        width: 6.0, height: 20.3, depth: 6.0, weight: 500,
        priceRange: [1.50, 2.25]
    },
    {
        name: "Smartwater 20oz",
        description: "Vapor-distilled water with electrolytes",
        category: "Beverages",
        width: 6.7, height: 24.1, depth: 6.7, weight: 590,
        priceRange: [2.50, 3.50]
    },

    // ENERGY DRINKS
    {
        name: "Red Bull Energy Drink 8.4oz",
        description: "Energy drink with caffeine, taurine and B-vitamins",
        category: "Energy Drinks",
        width: 5.3, height: 17.1, depth: 5.3, weight: 250,
        priceRange: [3.25, 4.50]
    },
    {
        name: "Monster Energy 16oz",
        description: "High caffeine energy drink",
        category: "Energy Drinks",
        width: 6.6, height: 17.8, depth: 6.6, weight: 473,
        priceRange: [3.50, 4.75]
    },
    {
        name: "5-Hour Energy Shot 2oz",
        description: "Concentrated energy shot supplement",
        category: "Energy Drinks",
        width: 3.8, height: 9.5, depth: 3.8, weight: 57,
        priceRange: [3.99, 5.99]
    },

    // SNACKS - CHIPS
    {
        name: "Lay's Classic Potato Chips 1.5oz",
        description: "Crispy potato chips with salt",
        category: "Snacks",
        width: 12.7, height: 17.8, depth: 7.6, weight: 43,
        priceRange: [1.75, 2.50]
    },
    {
        name: "Doritos Nacho Cheese 1.75oz",
        description: "Tortilla chips with nacho cheese flavor",
        category: "Snacks",
        width: 13.3, height: 18.4, depth: 8.9, weight: 50,
        priceRange: [1.75, 2.75]
    },
    {
        name: "Cheetos Crunchy 2.25oz",
        description: "Cheese flavored corn puff snacks",
        category: "Snacks",
        width: 14.0, height: 20.3, depth: 10.2, weight: 64,
        priceRange: [1.99, 2.99]
    },
    {
        name: "Pringles Original 5.5oz",
        description: "Stackable potato crisps in canister",
        category: "Snacks",
        width: 7.4, height: 25.4, depth: 7.4, weight: 156,
        priceRange: [2.25, 3.25]
    },
    {
        name: "Fritos Original Corn Chips 1oz",
        description: "Crispy corn chips with salt",
        category: "Snacks",
        width: 11.4, height: 15.2, depth: 6.4, weight: 28,
        priceRange: [1.25, 1.99]
    },

    // CANDY
    {
        name: "Snickers Bar 1.86oz",
        description: "Chocolate bar with peanuts, caramel and nougat",
        category: "Candy",
        width: 11.2, height: 2.5, depth: 1.3, weight: 53,
        priceRange: [1.50, 2.25]
    },
    {
        name: "Kit Kat Bar 1.5oz",
        description: "Wafer fingers covered in milk chocolate",
        category: "Candy",
        width: 10.8, height: 2.2, depth: 1.5, weight: 42,
        priceRange: [1.50, 2.25]
    },
    {
        name: "M&M's Peanut 1.74oz",
        description: "Chocolate candies with peanut center",
        category: "Candy",
        width: 9.5, height: 13.3, depth: 2.5, weight: 49,
        priceRange: [1.75, 2.50]
    },
    {
        name: "Reese's Peanut Butter Cups 1.5oz",
        description: "Chocolate cups with peanut butter filling",
        category: "Candy",
        width: 10.2, height: 2.5, depth: 1.9, weight: 42,
        priceRange: [1.50, 2.25]
    },
    {
        name: "Skittles Original 2.17oz",
        description: "Fruit flavored chewy candies",
        category: "Candy",
        width: 7.6, height: 12.7, depth: 2.5, weight: 61,
        priceRange: [1.75, 2.50]
    },
    {
        name: "Twix Caramel Cookie Bar 1.79oz",
        description: "Cookie bars with caramel and chocolate",
        category: "Candy",
        width: 11.4, height: 2.5, depth: 1.5, weight: 51,
        priceRange: [1.50, 2.25]
    },

    // GUM & MINTS
    {
        name: "Trident Spearmint Gum",
        description: "Sugar-free spearmint chewing gum",
        category: "Gum & Mints",
        width: 7.0, height: 1.5, depth: 2.5, weight: 27,
        priceRange: [1.25, 1.99]
    },
    {
        name: "Tic Tac Mint",
        description: "Small breath mints in plastic container",
        category: "Gum & Mints",
        width: 3.8, height: 9.5, depth: 1.9, weight: 16,
        priceRange: [1.50, 2.25]
    },
    {
        name: "Altoids Peppermint Mints",
        description: "Strong peppermint mints in metal tin",
        category: "Gum & Mints",
        width: 6.4, height: 2.2, depth: 9.5, weight: 50,
        priceRange: [2.25, 3.25]
    },

    // PERSONAL CARE
    {
        name: "Advil Pain Reliever 10ct",
        description: "Ibuprofen pain relief tablets",
        category: "Personal Care",
        width: 6.4, height: 11.4, depth: 2.5, weight: 45,
        priceRange: [4.99, 7.99]
    },
    {
        name: "Tylenol Extra Strength 10ct",
        description: "Acetaminophen pain relief caplets",
        category: "Personal Care",
        width: 6.4, height: 11.4, depth: 2.5, weight: 45,
        priceRange: [4.99, 7.99]
    },
    {
        name: "Chapstick Classic 0.15oz",
        description: "Lip balm for dry lips",
        category: "Personal Care",
        width: 1.9, height: 7.0, depth: 1.9, weight: 4,
        priceRange: [1.99, 2.99]
    },
    {
        name: "Travel Size Hand Sanitizer 2oz",
        description: "Alcohol-based hand sanitizer gel",
        category: "Personal Care",
        width: 4.4, height: 11.4, depth: 2.5, weight: 60,
        priceRange: [2.50, 3.99]
    },

    // HOUSEHOLD ITEMS
    {
        name: "Tide To-Go Stain Remover Pen",
        description: "Instant stain remover pen",
        category: "Household",
        width: 1.9, height: 14.0, depth: 1.9, weight: 30,
        priceRange: [3.99, 5.99]
    },
    {
        name: "Bounty Paper Towels Travel Pack",
        description: "Absorbent paper towels in travel size",
        category: "Household",
        width: 15.2, height: 20.3, depth: 7.6, weight: 200,
        priceRange: [4.99, 6.99]
    },

    // FROZEN ITEMS
    {
        name: "Ben & Jerry's Ice Cream Pint",
        description: "Premium ice cream in various flavors",
        category: "Frozen",
        width: 10.8, height: 11.4, depth: 10.8, weight: 473,
        priceRange: [5.99, 7.99]
    },
    {
        name: "Hot Pocket Pepperoni Pizza",
        description: "Microwaveable stuffed sandwich",
        category: "Frozen",
        width: 12.7, height: 17.8, depth: 5.1, weight: 127,
        priceRange: [2.50, 3.50]
    },

    // COFFEE & HOT DRINKS
    {
        name: "Red Bull Coffee 8oz",
        description: "Ready-to-drink coffee with energy blend",
        category: "Coffee",
        width: 5.3, height: 17.1, depth: 5.3, weight: 237,
        priceRange: [3.25, 4.50]
    },
    {
        name: "Starbucks Frappuccino 13.7oz",
        description: "Ready-to-drink coffee beverage",
        category: "Coffee",
        width: 6.4, height: 19.1, depth: 6.4, weight: 405,
        priceRange: [3.50, 4.99]
    },

    // MAGAZINES & READING
    {
        name: "People Magazine",
        description: "Weekly celebrity and human interest magazine",
        category: "Magazines",
        width: 20.3, height: 26.7, depth: 0.5, weight: 120,
        priceRange: [4.99, 5.99]
    },
    {
        name: "Sports Illustrated",
        description: "Sports news and analysis magazine",
        category: "Magazines",
        width: 21.0, height: 27.9, depth: 0.5, weight: 140,
        priceRange: [5.99, 6.99]
    },
    {
        name: "Local Newspaper",
        description: "Daily local newspaper",
        category: "Magazines",
        width: 29.2, height: 38.1, depth: 0.3, weight: 80,
        priceRange: [1.50, 2.50]
    },

    // AUTOMOTIVE
    {
        name: "5-Hour Energy Extra Strength",
        description: "Extra strength energy shot for drivers",
        category: "Automotive",
        width: 3.8, height: 9.5, depth: 3.8, weight: 57,
        priceRange: [4.99, 6.99]
    },

    // ELECTRONICS/ACCESSORIES
    {
        name: "Phone Charger Cable Lightning",
        description: "USB to Lightning charging cable",
        category: "Electronics",
        width: 15.2, height: 20.3, depth: 2.5, weight: 50,
        priceRange: [9.99, 14.99]
    },
    {
        name: "Earbuds Basic Wired",
        description: "Basic wired earphones with 3.5mm jack",
        category: "Electronics",
        width: 12.7, height: 15.2, depth: 3.8, weight: 25,
        priceRange: [7.99, 12.99]
    }
];

export function getRandomRealProduct(): RealProduct {
    const randomIndex = Math.floor(Math.random() * REAL_CONVENIENCE_STORE_PRODUCTS.length);
    return REAL_CONVENIENCE_STORE_PRODUCTS[randomIndex];
}

export function getRandomPrice(priceRange: [number, number]): number {
    const [min, max] = priceRange;
    return Number((Math.random() * (max - min) + min).toFixed(2));
}