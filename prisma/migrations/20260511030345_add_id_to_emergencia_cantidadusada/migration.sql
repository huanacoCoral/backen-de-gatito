/*
  Warnings:

  - You are about to drop the column `cantidadUnidad` on the `registroMaterial` table. All the data in the column will be lost.
  - Added the required column `cantidadUsada` to the `registroMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registroMaterial" DROP COLUMN "cantidadUnidad",
ADD COLUMN     "cantidadUsada" INTEGER NOT NULL;
