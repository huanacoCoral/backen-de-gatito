/*
  Warnings:

  - You are about to drop the column `nnombre` on the `Voluntario` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Voluntario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voluntario" DROP COLUMN "nnombre",
ADD COLUMN     "nombre" TEXT NOT NULL;
