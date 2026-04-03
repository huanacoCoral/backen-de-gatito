import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaquinistaDto } from './dto/create-maquinista.dto';

@Injectable()
export class MaquinistaService {
    constructor(private prisma: PrismaService){}
    async crearMaquinista(dto: CreateMaquinistaDto) {
  // 1. Verificar que el voluntario exista
  const voluntario = await this.prisma.voluntario.findUnique({
    where: { id_voluntario: dto.id_voluntario },
  });

  if (!voluntario) {
    throw new BadRequestException('El voluntario no existe');
  }

  // 2. Verificar que NO sea ya maquinista
  const existe = await this.prisma.maquinista.findUnique({
    where: { id_voluntario: dto.id_voluntario },
  });

  if (existe) {
    throw new BadRequestException('El voluntario ya es maquinista');
  }

  // 3. Crear maquinista
  return this.prisma.maquinista.create({
    data: {
      id_voluntario: dto.id_voluntario,
      tipoLicencia: dto.tipoLicencia,
      fecha: new Date(dto.fecha),
    },
  });
}
listar(){
    return this.prisma.maquinista.findMany()
}
}
