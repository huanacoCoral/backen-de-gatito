/*
  Warnings:

  - You are about to drop the column `nombre` on the `registroMaterial` table. All the data in the column will be lost.
  - Added the required column `cantidadUnidad` to the `registroMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidadMedida` to the `registroMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "registroMaterial" DROP COLUMN "nombre",
ADD COLUMN     "cantidadUnidad" INTEGER NOT NULL,
ADD COLUMN     "unidadMedida" TEXT NOT NULL;
