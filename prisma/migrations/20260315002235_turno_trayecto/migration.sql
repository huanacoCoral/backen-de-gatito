/*
  Warnings:

  - You are about to drop the column `fecha` on the `TurnoTrayecto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TurnoTrayecto" DROP COLUMN "fecha",
ADD COLUMN     "dia" TEXT,
ADD COLUMN     "fechaFin" TIMESTAMP(3),
ADD COLUMN     "fechaInicio" TIMESTAMP(3);
