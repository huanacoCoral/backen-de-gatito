-- AlterTable
ALTER TABLE "Emergencia_utilizo_registroMaterial" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;
