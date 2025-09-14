import { prisma } from "./lib/prisma";


async function keepOnly1000Items() {
    // get all inventory with id only

    const allInventory = await prisma.inventory.findMany({
        select: {
            id: true,
        },
    });

    // pick inventory 1000 randomly
    const pickedInventory = allInventory.sort(() => 0.5 - Math.random()).slice(0, 1000);

    // delete all inventory not in the 1000 picked

    await prisma.inventory.deleteMany({
        where: {
            id: {
                notIn: pickedInventory.map((m: any) => m.id),
            },
        },
    });

    console.log("Kept only 1000 items");
}


(async()=>{
    await keepOnly1000Items();
})();
