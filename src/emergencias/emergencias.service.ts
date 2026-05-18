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

  crear(dto: CreateEmergenciaDto) {
    return this.prisma.emergencia.create({
      data: {

        fecha: new Date(),
        hora: dto.hora,
        direccion: dto.direccion,
        cel_ref: dto.cel_ref,
        nombrePersona: dto.nombrePersona,
        tipoRecepcion: dto.tipoRecepcion,

        id_gravedad: dto.id_gravedad,
        id_voluntario:dto.id_voluntario,
      },
    });
  }

  /* funciona pero debe mostrar solo lo que tienen estadoA
  listar() {
      return this.prisma.emergencia.findMany({
    include: {
      gravedad: true,
      voluntario: true,
      // Trae los tipos de emergencia
      tiposEmergencia: {
        include: {
          tipoEmergencia: true // Ajusta este nombre según el modelo en Emer_tiene_TipoEmer
        }
      },
      // Trae los vehículos participantes
       vehiculos: {

        include: {

          vehiculo: {

            include: {
              ingreso: true,
             
            }
          },
          maquinista: {

            include: {

              voluntario: true

            }

          }
        }
      },
      // Trae materiales, productos, informes y recepciones
      materiales: true,
      productos: true,
      informes: true,
       recepciones: {
        include: {
          voluntario: true // Esto trae los datos del Voluntario que recibió
        }
      },
    },
    where: {
      estado: 'A' // Opcional: solo traer los activos
    },
    orderBy: {
      id_emergencia: 'desc' // Opcional: los más recientes primero
    }
  });
  }*/

  listar() {
  return this.prisma.emergencia.findMany({
    where: {
      estado: 'A'
    },

    include: {

      gravedad: true,

      voluntario: true,

      // TIPOS DE EMERGENCIA
      tiposEmergencia: {

        include: {

          tipoEmergencia: true

        }

      },

      // VEHICULOS PARTICIPANTES
      vehiculos: {

        where: {
          estado: 'A'
        },

        include: {

          vehiculo: {

            include: {

              ingreso: true

            }

          },

          maquinista: {

            include: {

              voluntario: true

            }

          }

        }

      },

      // MATERIALES
      materiales: true,

      // PRODUCTOS
      productos: true,

      // INFORMES
      informes: true,

      // RECEPCIONES
      recepciones: {

        where: {
          estado: 'A'
        },

        include: {

          voluntario: true

        }

      }

    },

    orderBy: {

      id_emergencia: 'desc'

    }

  });

}
 
  // tipos de emergencia 
  async crearTipoEmergencia(dto: CrearTipoEmergenciaDto) {
  return this.prisma.tipoEmergencia.create({
    
    data: {
      nombre: dto.nombre,
      codigo: dto.codigo,
      id_modificacion:dto.id_modificacion
    },
  });
}

async listarTiposEmergencia() {
  return this.prisma.tipoEmergencia.findMany({
    where:{
      estado:'A'
    }
  });
}
  async editarTipoEmergencia(dto: CrearTipoEmergenciaDto) {
  return this.prisma.tipoEmergencia.update({
    where:{
      id_tipoEmergencia:dto.id_tipoEmergencia
    },
    data: {
      nombre: dto.nombre,
      codigo: dto.codigo,
      id_modificacion:dto.id_modificacion,
      estado:dto.estado
    },
  });
}
 async eliminarTipoEmergencia(dto: any) {
  return this.prisma.tipoEmergencia.update({
    where:{
      id_tipoEmergencia:dto.id_tipoEmergencia
    },
    data: {
      id_modificacion:dto.id_modificacion,
      estado:dto.estado
    },
  });
}


// aqui estamos asignando es decir relacion de N a N
async asignarTipoEmergencia(dto: AsignarTipoEmergenciaDto) {
  console.log(dto,"-----");
  
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

async listarVoluntariosDisponibles(fecha: string, dia: number, hora: string) {
  //console.log(fecha,"string", dia,"----", hora,"-----");
  console.log('informacion--',fecha,'--dia--',dia,'--hora--',hora);
  
  const partes = fecha.split('/');
// Ojo: el mes en JavaScript empieza en 0 (Enero es 0, Mayo es 4)
const fechaBusqueda = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
console.log("------>fechabusqueda",fechaBusqueda);

  //console.log("fechaBusqueda",fechaBusqueda);
  
const trayectos = await this.prisma.turnoTrayecto.findMany({ });
console.log("trayectos encontrados:", JSON.stringify(trayectos, null, 2));

  try {
    const trayectos = await this.prisma.turnoTrayecto.findMany({
      where: {
        estado: "A",
        dia: dia+'', // "Lunes", "Martes", etc.
        // Verificamos que la fecha de la emergencia esté dentro del rango de vigencia del trayecto
        fechaInicio: {
          lte: fechaBusqueda
        },
        fechaFin: {
          gte: fechaBusqueda
        }
      },
      include: {
        voluntario: true,
        turno: true
      }
    });
    console.log("trayectos",trayectos);
    
    // Filtrado por el string del turno: "Noche/00:00/08:30"
    const disponibles = trayectos.filter(t => {
      if (!t.turno?.nombre) return false;

      const partes = t.turno.nombre.split('/');
      if (partes.length < 3) return false;

      const [_, inicio, fin] = partes; // Ignoramos el nombre, tomamos inicio y fin

      // Comparación directa de strings de hora "HH:mm" funciona bien en formato 24h
      // Ejemplo: "14:30" >= "08:00" && "14:30" <= "16:00"
      
      // Manejo de turnos que cruzan la medianoche (ej: 22:00 a 06:00)
      if (inicio > fin) {
        return hora >= inicio || hora <= fin;
      }

      return hora >= inicio && hora <= fin;
    }).map(t => ({
      ...t.voluntario,
      turnoAsignado: t.turno.nombre // Información extra útil para el frontend
    }));

    return disponibles;
  } catch (error) {
    console.error(error);
    throw new Error("Error al buscar voluntarios");
  }
}


//-*
// ===============================
// EDITAR EMERGENCIA COMPLETA
// ===============================

async editarEmergenciaCompleta(id_emergencia: number,data: any) {
console.log("---->",id_emergencia,"-*-*-",data);

  return await this.prisma.$transaction(async (tx) => {

    // ===================================
    // 1 ACTUALIZAR EMERGENCIA
    // ===================================

    const emergencia = await tx.emergencia.update({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        fecha: data.emergencia.fecha,

        hora: data.emergencia.hora,

        direccion: data.emergencia.direccion,

        cel_ref: data.emergencia.cel_ref,

        nombrePersona: data.emergencia.nombrePersona,

        tipoRecepcion: data.emergencia.tipoRecepcion,

        id_gravedad: data.emergencia.id_gravedad,

        id_modificacion:data.emergencia.id_modificacion

      }

    });

    // ===================================
    // 2 DESACTIVAR RELACIONES VIEJAS
    // ===================================

    // TIPOS
    await tx.emer_tiene_TipoEmer.deleteMany({

      where: {

        id_emergencia: id_emergencia

      }

    });

    // RECEPCION
    await tx.vol_recepcion_emer.updateMany({

      where: {
        id_emergencia: id_emergencia
      },
      data: {
        estado: 'I'
      }

    });

    // VEHICULOS
    await tx.vehi_participo_emer.updateMany({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        estado: 'I'

      }

    });

    // ===================================
    // 3 INSERTAR NUEVAS RELACIONES
    // ===================================
console.log("----data---",data);
console.log("----datatiposEmergencia---",data.tiposEmergencia);

    // TIPOS
    for (const tipo of data.tiposEmergencia) {

      await tx.emer_tiene_TipoEmer.create({

        data: {

          id_emergencia: id_emergencia,

          id_tipoEmergencia:tipo.id_tipoEmergencia

        }

      });

    }

    // RECEPCION
    for (const voluntario of data.voluntariosRecepcion) {

      await tx.vol_recepcion_emer.create({

        data: {

          id_emergencia: id_emergencia,

          id_voluntario: voluntario.id_voluntario,

          estado: 'A'

        }

      });

    }

    // VEHICULOS
    for (const vehiculo of data.vehiculos) {

      await tx.vehi_participo_emer.create({

        data: {

          id_emergencia: id_emergencia,

          id_vehiculo: vehiculo.id_vehiculo,

          id_voluntario: vehiculo.id_voluntario,

          estado: 'A'

        }

      });

    }

    // ===================================
  // 4 RETORNAR TODO
  // ===================================

 const emergenciaCompleta = await tx.emergencia.findUnique({

  where: {
    id_emergencia: id_emergencia
  },

  include: {

    gravedad: true,

    voluntario: true,

    // TIPOS DE EMERGENCIA
    tiposEmergencia: {
      include: {
        tipoEmergencia: true
      }
    },

    // VOLUNTARIOS RECEPCION
    recepciones: {

      where: {
        estado: 'A'
      },

      include: {
        voluntario: true
      }

    },

    // VEHICULOS Y MAQUINISTAS
    vehiculos: {

      where: {
        estado: 'A'
      },

      include: {

        vehiculo: true,

        maquinista: {
          include: {
            voluntario: true
          }
        }

      }

    }

  }

});

return emergenciaCompleta;

  });

}
// ===============================
// ELIMINAR EMERGENCIA
// ===============================

async eliminarEmergencia(id_emergencia: number,id_modificacion: number) {

  return await this.prisma.$transaction(async (tx) => {

    // EMERGENCIA
    await tx.emergencia.update({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }

    });

    // TIPOS
    await tx.emer_tiene_TipoEmer.deleteMany({

      where: {

        id_emergencia: id_emergencia

      }

    });

    // RECEPCIONES
    await tx.vol_recepcion_emer.updateMany({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }

    });

    // VEHICULOS
    await tx.vehi_participo_emer.updateMany({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }

    });

    // INFORMES
    await tx.informeEmergencia.updateMany({

      where: {

        id_Emergencia: id_emergencia

      },

      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }

    });

    // PRODUCTOS
    await tx.registroProducto.updateMany({
      where: {

        id_emergencia: id_emergencia
      },
      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }
    });
    // MATERIALES
    await tx.emergencia_utilizo_registroMaterial.updateMany({

      where: {

        id_emergencia: id_emergencia

      },

      data: {

        estado: 'I',

        id_modificacion: id_modificacion

      }

    });

    return {

      message: 'Emergencia eliminada correctamente'

    };

  });

}
crearInformeEmergenciaTermino(dto: any) {
  return this.prisma.informeEmergencia.create({
    data: {
      id_Emergencia: dto.id_Emergencia,
      descripcion: dto.descripcion,
      id_voluntario: dto.id_voluntario,
    },
  });
}
actualizarInformeEmergenciaTermino(dto: any) {
  console.log("actulizandooo",dto);
  
  return this.prisma.informeEmergencia.update({
    where: {
      id_informeEmergencia: dto.id_informeEmergencia,
    },
    data: {
      id_Emergencia: dto.id_Emergencia,
      descripcion: dto.descripcion,
      id_modificacion: dto.id_modificacion,
    },
  });
}


}
