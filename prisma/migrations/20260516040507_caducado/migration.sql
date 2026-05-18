-- DropForeignKey
ALTER TABLE "registroProducto" DROP CONSTRAINT "registroProducto_id_emergencia_fkey";

-- AlterTable
ALTER TABLE "registroProducto" ALTER COLUMN "id_emergencia" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "registroProducto" ADD CONSTRAINT "registroProducto_id_emergencia_fkey" FOREIGN KEY ("id_emergencia") REFERENCES "Emergencia"("id_emergencia") ON DELETE SET NULL ON UPDATE CASCADE;
