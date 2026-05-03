/*
  Warnings:

  - You are about to drop the column `nombre` on the `Vehiculo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Maqui_condujo_vehi" DROP CONSTRAINT "Maqui_condujo_vehi_id_voluntario_fkey";

-- AlterTable
ALTER TABLE "Vehiculo" DROP COLUMN "nombre";

-- AddForeignKey
ALTER TABLE "Maqui_condujo_vehi" ADD CONSTRAINT "Maqui_condujo_vehi_id_voluntario_fkey" FOREIGN KEY ("id_voluntario") REFERENCES "Maquinista"("id_voluntario") ON DELETE RESTRICT ON UPDATE CASCADE;
