import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehiculoDto } from './dto/create-vehiculos.dto';
import { IngresoVehiculoDto } from './dto/ingreso-vehiculo.dto';
import { RegistrarConduccionDto } from './dto/registrar-conduccion.dto';
import { MantenimientoDto } from './dto/mantenimiento.dto';
import { CrearVehiParticipoEmerDto } from './dto/vincular-ingreso-lote.dto';

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
    data: {
      ...dto,

      vehiculo: {
        create: {
          kilometrajeUtilizado: dto.kilometrajeIngreso
        }
      }
    },
    include: {
      vehiculo: true
    }
  });
}
  listarIngresosVehiculos() {
    return this.prisma.ingresoInformeVehiculo.findMany({
    where: {
      estado: 'A',
       vehiculo: {
        estado: 'A',
      },
    },
    include: {

      // 👨‍🚒 quién registró el ingreso
      voluntario: true,

      // 🚒 vehículo completo
      vehiculo: {
        include: {

          mantenimientos: {
            where: {
              estado: 'A'
            }
          },
          emergencias: {
            where: {
              estado: 'A'
            }
          },
        }
      },
    },
  });
  }
  async editarIngresosVehiculos(
  id: number,
  dto: IngresoVehiculoDto
) {
  return this.prisma.ingresoInformeVehiculo.update({
    where: {
      id_ingresoInformeVehiculo: id
    },

    data: {
      ...dto,

    },

    include: {
      vehiculo: true
    }
  });
}
  async eliminarIngresosVehiculos(id: number, dto: any) {
  return this.prisma.ingresoInformeVehiculo.update({
    where: {
      id_ingresoInformeVehiculo: id
    },

    data: {
      estado: dto.estado,

      vehiculo: {
        update: {
          estado: dto.estado
        }
      }
    },

    include: {
      vehiculo: true
    }
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
  listarVehiculo() {
    return this.prisma.vehiculo.findMany({
      include: {

      ingreso: true,

      mantenimientos: true,

      emergencias: {
        include: {
          emergencia: true,
        },
      },

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

    async crearVehiculoEmergencia(dto: CrearVehiParticipoEmerDto) {

  return this.prisma.vehi_participo_emer.create({
    data: {
      id_vehiculo: dto.id_vehiculo,
      id_emergencia: dto.id_emergencia,
      id_voluntario: dto.id_voluntario
    },

    include: {
      vehiculo: {
        include: {
          ingreso: true
        }
      },

      emergencia: true
    }
  });

}
async crearParticipacion(data: any) {

    return await this.prisma.vehi_participo_emer.create({

      data: {

        id_vehiculo: data.id_vehiculo,
        id_emergencia: data.id_emergencia,
        id_voluntario: data.id_voluntario

      }

    });

  }
  crearMantenimiento(dto: any) {
    return this.prisma.mantenimiento.create({
      data: {
        descripcion: dto.descripcion,
        fecha: new Date(dto.fecha),
        id_vehiculo: dto.id_vehiculo,
        id_voluntario: dto.id_voluntario,
        estado: 'A',
      },
    });
  }

  // =========================
  // ✏️ EDITAR
  // =========================
  actualizarMantenimiento(dto: any) {
    return this.prisma.mantenimiento.update({
      where: {
        id_mantenimiento: dto.id_mantenimiento,
      },
      data: {
        descripcion: dto.descripcion,
        fecha: new Date(dto.fecha),
        id_vehiculo: dto.id_vehiculo,
        id_voluntario: dto.id_voluntario,
        id_modificacion: dto.id_modificacion,
      },
    });
  }

  // =========================
  // ❌ ELIMINAR (SOFT DELETE)
  // =========================
  eliminarMantenimiento(id: number, dto: any) {
    console.log("---**");
    
    return this.prisma.mantenimiento.update({
      where: {
        id_mantenimiento: id,
      },
      data: {
        estado: 'I', // inactivo
        id_modificacion:dto.id_modificacion,
      },
    });
  }

  // =========================
  // 📄 LISTAR ACTIVOS
  // =========================
  listarMantenimiento(dto:any) {
    return this.prisma.mantenimiento.findMany({
      where: {
        estado: 'A',
        id_vehiculo:dto.id_vehiculo
      },
      include: {
        vehiculo: true,
        voluntario: true,
      },
    });
  }
}
