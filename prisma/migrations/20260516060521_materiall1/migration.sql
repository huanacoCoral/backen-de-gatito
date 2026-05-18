/*
  Warnings:

  - You are about to drop the column `cantidadUnidad` on the `registroMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `cantidadUsada` on the `registroMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "regisMate_tiene_loteMatel" ADD COLUMN     "cantidad" INTEGER,
ADD COLUMN     "unidad" TEXT;

-- AlterTable
ALTER TABLE "registroMaterial" DROP COLUMN "cantidadUnidad",
DROP COLUMN "cantidadUsada",
ADD COLUMN     "destino" TEXT,
ADD COLUMN     "tipoMovimiento" TEXT;
