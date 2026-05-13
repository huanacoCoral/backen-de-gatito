/*
  Warnings:

  - The primary key for the `Vehi_participo_emer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Vehi_participo_emer" DROP CONSTRAINT "Vehi_participo_emer_pkey",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vehi_participo_emer_pkey" PRIMARY KEY ("id");
