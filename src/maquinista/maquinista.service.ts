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
      id_modificacion:dto.id_modificacion
    },
  });
}
async editar(id: number, dto: any) {
  return await this.prisma.maquinista.update({
    where: { id_voluntario: id }, // Ajusta 'id_maquinista' al nombre real en tu esquema
    data: {
      id_voluntario: dto.id_voluntario,
      tipoLicencia: dto.tipoLicencia,
      fecha: new Date(dto.fecha),
      id_modificacion: dto.id_modificacion
    },
  });
}
async eliminar(id: number, dto: any) {
  return await this.prisma.maquinista.update({
    where: { id_voluntario: id },
    data: {
      estado: 'B',
      id_modificacion: dto.id_modificacion
    },
  });
}

async maquinistaVolverActivar(id: number, dto: any) {
  return await this.prisma.maquinista.update({
    where: { id_voluntario: id },
    data: {
      estado: 'A',
      id_modificacion: dto.id_modificacion
    },
  });
}

listar(){
    return this.prisma.maquinista.findMany({
      where: {
    estado: 'A', // O el valor que necesites filtrar
  },
  include: {
      voluntario: true, // Esto trae todos los campos de la tabla voluntario
    },
    })
}
async crearCondujo_vehi(data: any) {
  console.log("----",data);
  
    return await this.prisma.maqui_condujo_vehi.create({
      data: {
        id_voluntario: data.id_voluntario,
        id_vehiculo: data.id_vehiculo
      }
    });

  }

  // LISTAR
  async listarCondujo_vehi() {

    return await this.prisma.maqui_condujo_vehi.findMany({
      include: {
        vehiculo: true,
        maquinista: true
      }
    });

  }

  

}
