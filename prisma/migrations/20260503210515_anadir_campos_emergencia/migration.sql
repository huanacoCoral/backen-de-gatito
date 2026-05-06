/*
  Warnings:

  - Added the required column `hora` to the `Emergencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emergencia" ADD COLUMN     "hora" TEXT NOT NULL;
