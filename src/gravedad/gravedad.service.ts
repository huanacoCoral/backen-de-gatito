import { Injectable } from '@nestjs/common';
import { CreateGravedadDto } from './dto/create-gravedad.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GravedadService {
  constructor(private prisma: PrismaService) {}

  crear(dto: CreateGravedadDto) {
    return this.prisma.gravedad.create({
      data: {
        nombre: dto.nombre,
        id_modificacion:dto.id_modificacion
      },
    });
  }
  editar(dto: CreateGravedadDto) {
    return this.prisma.gravedad.update({
      where: {
      id_gravedad: dto.id_gravedad
    },
      data: {
        nombre: dto.nombre,
        id_modificacion:dto.id_modificacion,
        estado:dto.estado
      },
    });
  }

  listar() {
    return this.prisma.gravedad.findMany({
      where: {
        estado: 'A',
      },
      orderBy: { id_gravedad: 'asc' },
    });
  }
}
