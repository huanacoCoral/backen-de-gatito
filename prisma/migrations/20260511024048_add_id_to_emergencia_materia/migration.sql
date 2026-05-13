/*
  Warnings:

  - The primary key for the `Emergencia_utilizo_registroMaterial` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Emergencia_utilizo_registroMaterial" DROP CONSTRAINT "Emergencia_utilizo_registroMaterial_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Emergencia_utilizo_registroMaterial_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Emergencia_utilizo_registroMaterial_id_emergencia_id_regist_idx" ON "Emergencia_utilizo_registroMaterial"("id_emergencia", "id_registroMaterial");
