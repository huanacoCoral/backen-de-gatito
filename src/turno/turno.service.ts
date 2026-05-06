import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearTurnoDto } from './dto/crear-turno.dto';
import { CrearCargoDto, UpdateTurnoTrayectoDto } from './dto/asignar-turno.dto';
import { AsignarTurnosDto } from './dto/listar-turnos.dto';

@Injectable()
export class TurnoService {
    constructor(private prisma: PrismaService) { }

    createTurno(dto: CrearTurnoDto) {// turnos tarde o manina
        console.log("dto--",dto);
        
        return this.prisma.turno.create({
            data: dto
        });
    }


    listarTurnosTrayecto() {
    return this.prisma.turnoTrayecto.findMany({
    where:{
        estado: 'A',
    },
    include: {
      turno: true,      // Trae los datos del turno (nombre, etc.)
      voluntario: {     // Trae los datos del voluntario
        select: {       // (Opcional) Selecciona solo los campos que necesitas
          nombre: true,
          apellido_paterno: true,
          ci: true
        }
      }
    },
    orderBy: {
      fecha_creacion: 'desc' // Para ver los más recientes primero
    }
  });
    }


    async asignarTurno(dto: CrearCargoDto) {// suponogo que aqui usamos tryecto de turno
        console.log("Revisando el ID del voluntario:", dto.id_voluntario);

        if (!dto.id_voluntario) {
            throw new Error("El ID del voluntario es obligatorio y llegó undefined");
        }

        return await this.prisma.turnoTrayecto.create({
            data: {
                fechaInicio: new Date(dto.fechaInicio),
                fechaFin: new Date(dto.fechaFin),
                dia: dto.dia,
                id_modificacion:dto.id_modificacion,
                turno: {
                    connect: { id_turno: Number(dto.id_turno) }
                },
                voluntario: {
                    connect: { id_voluntario: Number(dto.id_voluntario) } // Aseguramos que sea número
                }
            }
        });
    }
    async editarAsignarTurno (id:number ,dto: UpdateTurnoTrayectoDto) {// suponogo que aqui usamos tryecto de turno
        return this.prisma.turnoTrayecto.update({
            where: { id_turnoTrayecto: id },
            data: {
            ...dto,
            ...(dto.fechaInicio && { fechaInicio: new Date(dto.fechaInicio) }),
            ...(dto.fechaFin && { fechaFin: new Date(dto.fechaFin) }),
            }
        });
    }
    // listaremos las trayecorias de turno para crear calendario deacuerdo a fechas de rango
    listarTrayectoroariTurno(fechas: any) {
        return this.prisma.turnoTrayecto.findMany({
            where: {
                fechaInicio: {
                        gte: new Date(fechas.fechaInicio),
                        lte: new Date(fechas.fechaFin)
                    }
            },
            include: {
                turno: true,
                voluntario: true
            },
            orderBy: {
                fechaInicio: 'asc'
                }
        });
    }
    


    historialTurnos(id_voluntario: AsignarTurnosDto) {
        return this.prisma.turnoTrayecto.findMany({
            where: { d_voluntario: id_voluntario.id_voluntario },
            include: { turno: true }
        });
    }

    async listarPorRango(inicio: Date, fin: Date) {
    return await this.prisma.turnoTrayecto.findMany({
      where: {
        estado: 'A', // Solo activos
        AND: [
          { fechaInicio: { gte: inicio } },
          { fechaFin: { lte: fin } }
        ]
      },
      include: {
        turno: true,       // Incluye relación Turno
        voluntario: true   // Incluye relación Voluntario
      }
    });
  }

}
