import { prisma } from "./lib/prisma";

// is promoted, sales rate

(async () => {
    // 1000 items

    const allInventory = await prisma.inventory.findMany({});


    for (let i = 0; i < allInventory.length; i++) {
        const inventory = allInventory[i];

        const randomBoolean = Math.random() < 0.01; // 1% chance to be true

        const randomSalesRate = Math.floor(Math.random() * 51) + 10; // Random sales rate between 10% and 60%

        // if(randomBoolean){
        await prisma.inventory.update({
            where: { id: inventory.id },
            data: {
                isPromoted: randomBoolean,
                salesRate: randomSalesRate
            }
        });
        console.log(`Updated inventory ${inventory.id} to be promoted with sales rate ${randomSalesRate}%`);
        // }
    }

})()