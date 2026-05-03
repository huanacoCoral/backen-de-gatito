import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehiculoDto } from './dto/create-vehiculos.dto';
import { IngresoVehiculoDto } from './dto/ingreso-vehiculo.dto';
import { RegistrarConduccionDto } from './dto/registrar-conduccion.dto';
import { MantenimientoDto } from './dto/mantenimiento.dto';

@Injectable()
export class VehiculosService {
  constructor(private readonly prisma: PrismaService) {

  }
  crearVehiculo(dto: CreateVehiculoDto) {
    return this.prisma.vehiculo.create({
      data: {
      //nombre: dto.nombre,
      kilometrajeUtilizado: dto.kilometrajeUtilizado,
      ingreso: {
        connect: { id_ingresoInformeVehiculo: dto.id_ingresoInformeVehiculo }
      }
    }
  });
  }
  /*listarVER(){
      return this.prisma.vehiculo.findMany()
  }*/

  //regitrando ingreso del vehiculo 
  registrarIngreso(dto: IngresoVehiculoDto) {
    return this.prisma.ingresoInformeVehiculo.create({
    data: dto,
  });
  }
  listarIngresosVehiculos() {
    return this.prisma.ingresoInformeVehiculo.findMany({
    include: {
      vehiculo: true,   // Esto trae los datos del vehículo asociado
      voluntario: true, // También podrías traer quién registró el ingreso
    },
    where: {
      estado: 'A', // Opcional: solo traer los que estén activos
    },
  });
  }
  editarIngresosVehiculos(id:number, dto:IngresoVehiculoDto){
    return this.prisma.ingresoInformeVehiculo.update({
    where: { id_ingresoInformeVehiculo: id },
    data: dto,
  });
  }
  eliminarIngresosVehiculos(id:number, dto:any){
    return this.prisma.ingresoInformeVehiculo.update({
    where: { id_ingresoInformeVehiculo: id },
    data: {
      estado:dto.estado
    },
  });
  }


  //vehiculo participante de emergencia 
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
        mantenimientos: true,
        emergencias: {
          include: {
            emergencia: true,
          },
        }
        
      },
    });
  }
  //aqui se vincula pero creo q falta el actualizar del stock, veamos como funciona
 /* vincularIngresoALote(dto: VincularIngresoLoteDto) {
    return this.prisma.lotVehi_contiene_ingInfVehi.create({
      data: {
        id_loteVehiculo: dto.id_loteVehiculo,
        id_informeIngresoVehiculo: dto.id_informeIngresoVehiculo,
      },
    });
  }*/


}
