-- DropForeignKey
ALTER TABLE "public"."InventoryPlacement" DROP CONSTRAINT "InventoryPlacement_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InventoryPlacement" DROP CONSTRAINT "InventoryPlacement_shelfId_fkey";

-- AddForeignKey
ALTER TABLE "public"."InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."shelves"("id") ON DELETE CASCADE ON UPDATE CASCADE;
