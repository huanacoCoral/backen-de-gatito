import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearTurnoDto } from './dto/crear-turno.dto';
import { CrearCargoDto } from './dto/asignar-turno.dto';
import { AsignarTurnosDto } from './dto/listar-turnos.dto';

@Injectable()
export class TurnoService {
    constructor(private prisma: PrismaService) { }

    createTurno(dto: CrearTurnoDto) {// turnos tarde o manina
        return this.prisma.turno.create({
            data: dto
        });
    }


    findAllTurnos() {
        return this.prisma.turno.findMany();
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
                turno: {
                    connect: { id_turno: Number(dto.id_turno) }
                },
                voluntario: {
                    connect: { id_voluntario: Number(dto.id_voluntario) } // Aseguramos que sea número
                }
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
}
