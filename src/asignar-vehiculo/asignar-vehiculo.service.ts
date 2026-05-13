import { Injectable } from '@nestjs/common';
import { AsignarVehiculoDto } from './dto/create-asignarVehiculo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AsignarVehiculoService {
    constructor(private prisma: PrismaService) { }
    async asignarVehiculo(dto: AsignarVehiculoDto) {
        //validar que existan
        await this.prisma.emergencia.findUniqueOrThrow({
            where: { id_emergencia: dto.id_emergencia },
        });

        await this.prisma.vehiculo.findUniqueOrThrow({
            where: { id_vehiculo: dto.id_vehiculo },
        });

        return this.prisma.vehi_participo_emer.create({
            data: {
                id_emergencia: dto.id_emergencia,
                id_vehiculo: dto.id_vehiculo,
                 id_voluntario: dto.id_voluntario
            },
        });
    }
    listar() {
    return this.prisma.emergencia.findMany({
        include: {
        vehiculos: {
            include: {
            vehiculo: true,
            },
        },
        gravedad: true,
        voluntario: true,
        },
    });
    }

}
