/*
  Warnings:

  - You are about to drop the column `cantidad` on the `registroProducto` table. All the data in the column will be lost.
  - You are about to drop the column `unidad` on the `registroProducto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "registroProducto" DROP COLUMN "cantidad",
DROP COLUMN "unidad";
