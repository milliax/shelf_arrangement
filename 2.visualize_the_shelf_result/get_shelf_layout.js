const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function getShelfLayouts() {
  try {
    // Get all shelves with their inventory placements
    const shelves = await prisma.shelves.findMany({
      include: {
        inventory_placements: {
          include: {
            inventories: true
          }
        }
      },
      orderBy: {
        shelf_id: 'asc'
      }
    });

    console.log('Shelf Layouts:\n');
    
    shelves.forEach(shelf => {
      console.log(`Shelf ${shelf.shelf_id}:`);
      console.log(`  Dimensions: ${shelf.width} x ${shelf.height} x ${shelf.depth}`);
      console.log(`  Position: (${shelf.position_x || 'N/A'}, ${shelf.position_y || 'N/A'})`);
      console.log(`  Eye Level: ${shelf.eye_level || 'N/A'}`);
      
      if (shelf.inventory_placements.length > 0) {
        console.log('  Items:');
        shelf.inventory_placements.forEach(placement => {
          console.log(`    - Slot ${placement.slot_id}: ${placement.inventories.name} (Score: ${placement.placement_score || 'N/A'})`);
        });
      } else {
        console.log('  Items: Empty');
      }
      console.log('');
    });

  } catch (error) {
    console.error('Error fetching shelf layouts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getShelfLayouts();