import { prisma } from "./lib/prisma";


async function keepOnly200Items() {
    // get all inventory with id only

    const allInventory = await prisma.inventory.findMany({
        select: {
            id: true,
        },
    });

    // pick inventory 200 randomly
    const pickedInventory = allInventory.sort(() => 0.5 - Math.random()).slice(0, 200);

    // delete all inventory not in the 1000 picked

    await prisma.inventory.deleteMany({
        where: {
            id: {
                notIn: pickedInventory.map((m: any) => m.id),
            },
        },
    });

    console.log("Kept only 200 items");
}


(async()=>{
    await keepOnly200Items();
})();
