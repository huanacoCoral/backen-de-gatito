/*
  Warnings:

  - You are about to drop the column `id_vehiculo` on the `ingresoInformeVehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_ingresoInformeVehiculo]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_ingresoInformeVehiculo` to the `Vehiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ingresoInformeVehiculo" DROP CONSTRAINT "ingresoInformeVehiculo_id_vehiculo_fkey";

-- AlterTable
ALTER TABLE "Vehiculo" ADD COLUMN     "id_ingresoInformeVehiculo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ingresoInformeVehiculo" DROP COLUMN "id_vehiculo";

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_id_ingresoInformeVehiculo_key" ON "Vehiculo"("id_ingresoInformeVehiculo");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_id_ingresoInformeVehiculo_fkey" FOREIGN KEY ("id_ingresoInformeVehiculo") REFERENCES "ingresoInformeVehiculo"("id_ingresoInformeVehiculo") ON DELETE RESTRICT ON UPDATE CASCADE;
