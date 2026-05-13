/*
  Warnings:

  - The primary key for the `Maqui_condujo_vehi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vol_recepcion_emer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Maqui_condujo_vehi" DROP CONSTRAINT "Maqui_condujo_vehi_pkey",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Maqui_condujo_vehi_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vol_recepcion_emer" DROP CONSTRAINT "Vol_recepcion_emer_pkey",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vol_recepcion_emer_pkey" PRIMARY KEY ("id");
