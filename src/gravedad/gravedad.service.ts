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
      },
    });
  }

  listar() {
    return this.prisma.gravedad.findMany({
      orderBy: { id_gravedad: 'asc' },
    });
  }
}
