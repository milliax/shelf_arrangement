/*
  Warnings:

  - You are about to drop the column `position_x` on the `shelves` table. All the data in the column will be lost.
  - You are about to drop the column `position_y` on the `shelves` table. All the data in the column will be lost.
  - The `eye_level` column on the `shelves` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `weight` to the `shelves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."shelves" DROP COLUMN "position_x",
DROP COLUMN "position_y",
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
DROP COLUMN "eye_level",
ADD COLUMN     "eye_level" BOOLEAN,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);
