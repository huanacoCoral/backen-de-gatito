import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehiculoDto } from './dto/create-vehiculos.dto';
import { IngresoVehiculoDto } from './dto/ingreso-vehiculo.dto';
import { CrearLoteVehiculoDto } from './dto/crear-lote.dto';
import { RegistrarConduccionDto } from './dto/registrar-conduccion.dto';
import { MantenimientoDto } from './dto/mantenimiento.dto';
import { VincularIngresoLoteDto } from './dto/vincular-ingreso-lote.dto';

@Injectable()
export class VehiculosService {
    constructor(private readonly prisma:PrismaService){

    }
    crearVehiculo (dto: CreateVehiculoDto){
        return this.prisma.vehiculo.create({
            data:{
            nombre:dto.nombre,
            kilometrajeUtilizado:dto.kilometrajeUtilizado      
            }
        })
    }
    /*listarVER(){
        return this.prisma.vehiculo.findMany()
    }*/

    //regitrando ingreso del vehiculo 
    registrarIngreso(dto: IngresoVehiculoDto) {
  return this.prisma.ingresoInformeVehiculo.create({
    data: {
      ...dto,
    },
  });
}
//creando lotes de vehiculos 
crearLote(dto: CrearLoteVehiculoDto) {
  return this.prisma.loteVehiculo.create({
    data: dto,
  });
}
//vechilo participante de emergencia 
//vehiculo registro conduccion maquinista
registrarConduccion(dto: RegistrarConduccionDto) {
  return this.prisma.maqui_condujo_vehi.create({
    data: dto,
  });
}
registrarMantenimiento(dto: MantenimientoDto) {
  return this.prisma.mantenimiento.create({
    data: dto,
  });
}
// listara al final con todo
listar() {
  return this.prisma.vehiculo.findMany({
    include: {
      lotesVehiculo: true,
      mantenimientos: true,
      emergencias: {
        include: {
          emergencia: true,
        },
      },
      maquinistasCondujo: {
        include: {
          voluntario: true,
        },
      },
    },
  });
}
//aqui se vincula pero creo q falta el actualizar del stock, veamos como funciona
vincularIngresoALote(dto: VincularIngresoLoteDto) {
  return this.prisma.lotVehi_contiene_ingInfVehi.create({
    data: {
      id_loteVehiculo: dto.id_loteVehiculo,
      id_informeIngresoVehiculo: dto.id_informeIngresoVehiculo,
    },
  });
}


}
