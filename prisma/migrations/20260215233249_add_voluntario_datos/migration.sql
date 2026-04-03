/*
  Warnings:

  - A unique constraint covering the columns `[ci]` on the table `Voluntario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellido_paterno` to the `Voluntario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ci` to the `Voluntario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nnombre` to the `Voluntario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Voluntario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono_emergencia` to the `Voluntario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voluntario" ADD COLUMN     "apellido_materno" TEXT,
ADD COLUMN     "apellido_paterno" TEXT NOT NULL,
ADD COLUMN     "ci" TEXT NOT NULL,
ADD COLUMN     "correo_personal" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3),
ADD COLUMN     "nnombre" TEXT NOT NULL,
ADD COLUMN     "observaciones" TEXT,
ADD COLUMN     "sexo" TEXT,
ADD COLUMN     "telefono" TEXT NOT NULL,
ADD COLUMN     "telefono_emergencia" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Voluntario_ci_key" ON "Voluntario"("ci");
