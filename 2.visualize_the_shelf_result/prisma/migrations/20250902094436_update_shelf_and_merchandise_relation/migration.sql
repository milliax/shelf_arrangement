/*
  Warnings:

  - The primary key for the `InventoryPlacement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `InventoryPlacement` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_id` on the `InventoryPlacement` table. All the data in the column will be lost.
  - You are about to drop the column `optimization_run_id` on the `InventoryPlacement` table. All the data in the column will be lost.
  - You are about to drop the column `placement_score` on the `InventoryPlacement` table. All the data in the column will be lost.
  - You are about to drop the column `shelf_id` on the `InventoryPlacement` table. All the data in the column will be lost.
  - You are about to drop the column `slot_id` on the `InventoryPlacement` table. All the data in the column will be lost.
  - Added the required column `inventoryId` to the `InventoryPlacement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelfId` to the `InventoryPlacement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."InventoryPlacement" DROP CONSTRAINT "InventoryPlacement_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."InventoryPlacement" DROP CONSTRAINT "InventoryPlacement_shelf_id_fkey";

-- AlterTable
ALTER TABLE "public"."InventoryPlacement" DROP CONSTRAINT "InventoryPlacement_pkey",
DROP COLUMN "created_at",
DROP COLUMN "inventory_id",
DROP COLUMN "optimization_run_id",
DROP COLUMN "placement_score",
DROP COLUMN "shelf_id",
DROP COLUMN "slot_id",
ADD COLUMN     "inventoryId" INTEGER NOT NULL,
ADD COLUMN     "shelfId" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "InventoryPlacement_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "InventoryPlacement_id_seq";

-- AddForeignKey
ALTER TABLE "public"."InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InventoryPlacement" ADD CONSTRAINT "InventoryPlacement_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "public"."shelves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
