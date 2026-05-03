-- AlterTable
ALTER TABLE "Cargo" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "CargoTrayecto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Emergencia" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Gravedad" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Mantenimiento" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Maquinista" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Rol" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "RolTrayecto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "TipoEmergencia" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Turno" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "TurnoTrayecto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Vehiculo" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "Voluntario" ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER,
ALTER COLUMN "estado" SET DEFAULT 'A';

-- AlterTable
ALTER TABLE "informeEmergencia" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "informeIngresoMaterial" ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER,
ALTER COLUMN "estado" SET DEFAULT 'A';

-- AlterTable
ALTER TABLE "informeIngresoProducto" ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER,
ALTER COLUMN "fechaCreacion" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ingresoInformeVehiculo" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "loteMaterial" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "loteProducto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "registroMaterial" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;

-- AlterTable
ALTER TABLE "registroProducto" ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fecha_modificacion" TIMESTAMP(3),
ADD COLUMN     "id_modificacion" INTEGER;
