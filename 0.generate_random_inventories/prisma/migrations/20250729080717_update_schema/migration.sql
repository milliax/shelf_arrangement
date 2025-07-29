/*
  Warnings:

  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory_placements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_placements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "inventory_placements" DROP CONSTRAINT "inventory_placements_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "inventory_placements" DROP CONSTRAINT "inventory_placements_shelf_id_fkey";

-- DropForeignKey
ALTER TABLE "product_placements" DROP CONSTRAINT "product_placements_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_placements" DROP CONSTRAINT "product_placements_shelf_id_fkey";

-- DropTable
DROP TABLE "inventory";

-- DropTable
DROP TABLE "inventory_placements";

-- DropTable
DROP TABLE "product_placements";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "InventoryPlacement" (
    "id" SERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "shelf_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,
    "placement_score" DOUBLE PRECISION,
    "optimization_run_id" VARCHAR(100),
    "created_at" TIMESTAMP(6),

    CONSTRAINT "InventoryPlacement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "shelves"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
