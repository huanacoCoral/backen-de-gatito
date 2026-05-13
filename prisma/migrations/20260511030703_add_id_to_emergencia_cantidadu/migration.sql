/*
  Warnings:

  - You are about to drop the column `unidadMedida` on the `registroMaterial` table. All the data in the column will be lost.
  - Added the required column `cantidadUnidad` to the `registroMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registroMaterial" DROP COLUMN "unidadMedida",
ADD COLUMN     "cantidadUnidad" TEXT NOT NULL;
