import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmergenciaDto } from './dto/create-emergencias.dto';
import { CrearTipoEmergenciaDto } from './dto/crear-tipo-emergencia.dto';
import { AsignarTipoEmergenciaDto } from './dto/asignar-tipo-emergencia.dto';
import { VolRecepcionaEmergenciaDto } from './dto/vol-recepciona-emergencia.dto';
import { CrearInformeEmergenciaDto } from './dto/crear-informe-emergencia.dto';

@Injectable()
export class EmergenciasService {
    constructor(private prisma: PrismaService) {}

  crear(dto: CreateEmergenciaDto, id_voluntario: number) {
    return this.prisma.emergencia.create({
      data: {
        fecha: new Date(),
        direccion: dto.direccion,
        cel_ref: dto.cel_ref,
        nombrePersona: dto.nombrePersona,
        tipoRecepcion: dto.tipoRecepcion,
        id_gravedad: dto.id_gravedad,
        id_voluntario,
      },
    });
  }

  listar() {
    return this.prisma.emergencia.findMany({
      include: {
        gravedad: true,
        voluntario: true,
      },
    });
  }

  // tipos de emergencia 
  async crearTipoEmergencia(dto: CrearTipoEmergenciaDto) {
  return this.prisma.tipoEmergencia.create({
    data: {
      nombre: dto.nombre,
      codigo: dto.codigo,
    },
  });
}

async listarTiposEmergencia() {
  return this.prisma.tipoEmergencia.findMany();
}

// aqui estamos asignando es decir relacion de N a N
async asignarTipoEmergencia(dto: AsignarTipoEmergenciaDto) {
  return this.prisma.emer_tiene_TipoEmer.create({
    data: {
      id_emergencia: dto.id_emergencia,
      id_tipoEmergencia: dto.id_tipo_emergencia,
    },
  });
}

//aqui tenemos  el voluntario que atendio la emergencia
async voluntarioRecepcionaEmergencia(dto: VolRecepcionaEmergenciaDto) {
  return this.prisma.vol_recepcion_emer.create({
    data: {
      id_voluntario: dto.id_voluntario,
      id_emergencia: dto.id_emergencia,
      //fecha: new Date(dto.fecha),
    },
  });
}
async listarEmergencias() {
  return this.prisma.emergencia.findMany({
    include: {
      tiposEmergencia: {
        include: { tipoEmergencia: true },
      },
      recepciones: {
        include: { voluntario: true },
      },
    },
  });
}
async crearInformeEmergencia(dto: CrearInformeEmergenciaDto) {
  // Verificar que la emergencia exista
  const emergencia = await this.prisma.emergencia.findUnique({
    where: { id_emergencia: dto.id_emergencia },
  });

  if (!emergencia) {
    throw new BadRequestException('La emergencia no existe');
  }
  const voluntario = await this.prisma.voluntario.findUnique({
    where: { id_voluntario: dto.id_voluntario },
  });

  if (!voluntario) {
    throw new BadRequestException('el voluntario no existe');
  }

  // Verificar que no exista informe previo
  const informeExistente = await this.prisma.informeEmergencia.findFirst({
    where: { id_Emergencia: dto.id_emergencia },
  });

  if (informeExistente) {
    throw new BadRequestException('La emergencia ya tiene informe');
  }

  return this.prisma.informeEmergencia.create({
    data: {
      id_Emergencia: dto.id_emergencia,
      descripcion: dto.descripcion,
    id_voluntario: dto.id_voluntario,
   
    },
  });
}
async listarInformeEmergencias() {
  return this.prisma.emergencia.findMany({
    include: {
      informes: true,
      tiposEmergencia: {
        include: { tipoEmergencia: true },
      },
      recepciones: {
        include: { voluntario: true },
      },
    },
  });
}
}
