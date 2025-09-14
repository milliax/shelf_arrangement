-- AlterTable
ALTER TABLE "public"."Inventory" ADD COLUMN     "isPromoted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "salesRate" DOUBLE PRECISION;
