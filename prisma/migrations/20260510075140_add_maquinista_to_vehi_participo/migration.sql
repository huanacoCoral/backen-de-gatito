/*
  Warnings:

  - Added the required column `id_voluntario` to the `Vehi_participo_emer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehi_participo_emer" ADD COLUMN     "id_voluntario" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehi_participo_emer" ADD CONSTRAINT "Vehi_participo_emer_id_voluntario_fkey" FOREIGN KEY ("id_voluntario") REFERENCES "Maquinista"("id_voluntario") ON DELETE RESTRICT ON UPDATE CASCADE;
