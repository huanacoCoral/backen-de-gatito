import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ListarIngesosRealizadoPorVoluntario, ListarLote, ListarPorEmergenciaDto } from './dto/listar-producto.dto';
import { CrearLoteProductoDto } from './dto/crear-lote-producto.dto';
import { CrearIngresoProductoDto } from './dto/crear-ingreso-producto.dto';
import { VincularIngresoLoteDto, VinculoRegistroLoteProductoDto } from './dto/vinculos.dto';
import { CreateRegistroProductoDto } from './dto/crear-registro-producto.dto';

@Injectable()
export class ProductoService {
    constructor(private prisma: PrismaService) {}
        
createRegistroProducto(dto: CrearProductoDto) {
  return this.prisma.registroProducto.create({
    data: {
      destino: dto.destino,
      unidad: dto.unidad,
      cantidad: dto.cantidad,
      id_emergencia: dto.id_emergencia
    }
  });
}
productosPorEmergencia(dto: ListarPorEmergenciaDto) {
  return this.prisma.registroProducto.findMany({
    where: { id_emergencia:dto.id_emergencia},
    include: {
      lotes: {
        include: {
          loteProducto: true
        }
      }
    }
  });
}
createLoteProducto(data: CrearLoteProductoDto) {
  return this.prisma.loteProducto.create({
    data: {
      tipo: data.tipo,
      stock: data.stock,
      nombre:data.nombre,
      id_modificacion: data.id_modificacion
    }
  });
}
listarLotesProducto() {
 return this.prisma.loteProducto.findMany({
  where: {
    estado: 'A',
  },
  include: {
    informes: true,
    registros: true,
    contieneInformes: true,
  },
});
}
actualizarLoteProducto(id: number, data: any) {
  return this.prisma.loteProducto.update({
    where: {
      id_loteProducto: id, // Asegúrate de que este nombre coincida con tu esquema de Prisma
    },
    data: {
      tipo: data.tipo,
      stock: data.stock,
      nombre:data.nombre,
      id_modificacion:data.id_modificacion
      // Si tienes un campo de auditoría, puedes agregarlo aquí:
      // id_modificacion: data.id_modificacion 
    },
  });
}
eliminarLoteProducto(id: number, data: any) {
  return this.prisma.loteProducto.update({
    where: {
      id_loteProducto: id, // Asegúrate de que este nombre coincida con tu esquema de Prisma
    },
    data: {
      id_modificacion:data.id_modificacion,
      estado:'B'
      // Si tienes un campo de auditoría, puedes agregarlo aquí:
      // id_modificacion: data.id_modificacion 
    },
  });
}
createIngresoProducto(data:CrearIngresoProductoDto) {
  console.log(data,"---data----");
  return this.prisma.informeIngresoProducto.create({
    
    
    data: {
      nombre: data.nombre,
      cantidad: data.cantidad,
      cantidadUnidad: data.cantidadUnidad,
      unidadMedida: data.unidadMedida,
      marca: data.marca,
      estado: data.estado,
      fechaCreacion: new Date(data.fechaCreacion),
      fechaCaducidad: new Date(data.fechaCaducidad),
      registroMantenimiento: data.registroMantenimiento,
      fechaAdquisicion: new Date(data.fechaAdquisicion),
      id_voluntario: data.id_voluntario,
      id_loteProducto:data.id_loteProducto
    }
  });
}
listarIngresosProducto() {
  return this.prisma.informeIngresoProducto.findMany({
    where:{
      estado: { not: 'B' },
    },
    include: {
      voluntario: true,
      loteProducto: true,
      lotesContenedor: true,
    },
  });
}
actualizarIngresoProducto(id: number, data: any) {
  return this.prisma.informeIngresoProducto.update({
    where:{
      id_informeIngresoProducto: id, 
    },
    data: {
      nombre: data.nombre,
      cantidad: data.cantidad,
      cantidadUnidad: data.cantidadUnidad,
      unidadMedida: data.unidadMedida,
      marca: data.marca,
      estado: data.estado,
      fechaCreacion: new Date(data.fechaCreacion),
      fechaCaducidad: new Date(data.fechaCaducidad),
      registroMantenimiento: data.registroMantenimiento,
      fechaAdquisicion: new Date(data.fechaAdquisicion),
      id_modificacion: data.id_modificacion,
      id_loteProducto:data.id_loteProducto
    }
  });
}
eliminarIngresoProducto(id: number, data: any) {
  return this.prisma.informeIngresoProducto.update({
    where:{
      id_informeIngresoProducto: id, 
    },
    data: {
      estado: data.estado,
      id_modificacion: data.id_modificacion,
    }
  });
}

/// relacion  ingreso lote
vincularIngresoLoteProducto(dto: VincularIngresoLoteDto) {
  return this.prisma.lotProduc_tiene_infIngProduc.create({
    data: {
      id_loteProducto:dto.id_loteProducto,
      id_informeIngresoProducto:dto.id_informeIngresoProducto
    }
  });
}
//producto lote
vincularRegistroProductoLote(dto:VinculoRegistroLoteProductoDto
) {
  return this.prisma.lotProduc_proviene_regisProd.create({
    data: {
      id_loteProducto:dto.id_loteProducto,
      id_registroProducto:dto.id_registroProducto
    }
  });
}
//
//consultas 
stockProducto() {
  return this.prisma.loteProducto.findMany({
    include: {
      informes: true,
      registros: {
        include: {
          registroProducto: true
        }
      }
    }
  });
}
//hisotiral del lote 
historialLoteProducto(dto:ListarLote) {
  return this.prisma.loteProducto.findUnique({
    where: { id_loteProducto:dto.id_loteProducto},
    include: {
      informes: {
        include: {
          voluntario: true
        }
      },
      registros: {
        include: {
          registroProducto: {
            include: {
              emergencia: true
            }
          }
        }
      }
    }
  });
}

//ingresos realizodos por un voluntario 
ingresosProductoPorVoluntario(dto: ListarIngesosRealizadoPorVoluntario) {
  return this.prisma.informeIngresoProducto.findMany({
    where: { id_voluntario:dto.id_voluntario }
  });
}


///------------registro productooo
 async crearRegistroProducto(data: CreateRegistroProductoDto) {
console.log(data,"---");

  return await this.prisma.$transaction(async (tx) => {

    // verificar emergencia
    const emergencia = await tx.emergencia.findUnique({
      where: {
        id_emergencia: data.id_emergencia,
      },
    });

    if (!emergencia) {
      throw new BadRequestException('La emergencia no existe');
    }

    for (const lote of data.lotes) {

      const existeLote = await tx.loteProducto.findUnique({
        where: {
          id_loteProducto: lote.id_loteProducto,
        },
      });

      if (!existeLote) {
        throw new BadRequestException(
          `El lote ${lote.id_loteProducto} no existe`,
        );
      }

      if (existeLote.stock < lote.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente en el lote ${lote.id_loteProducto}`,
        );
      }
    }

    // crear registro
    const nuevoRegistro = await tx.registroProducto.create({
      data: {
        destino: data.destino,
        unidad: data.unidad,
        cantidad: data.cantidad,
        id_modificacion: data.id_modificacion,
        emergencia: {
          connect: {
            id_emergencia: data.id_emergencia,
          },
        },

        lotes: {
          create: data.lotes.map((lote) => ({
            loteProducto: {
              connect: {
                id_loteProducto: lote.id_loteProducto,
              },
            },
          })),
        },
      },

      include: {
        emergencia: true,
        lotes: {
          include: {
            loteProducto: true,
          },
        },
      },
    });

    // descontar stock
    console.log("data.lotes",data.lotes);
    
    for (const lote of data.lotes) {
console.log("--->",lote);
      await tx.loteProducto.update({
        
        where: {
          id_loteProducto: lote.id_loteProducto,
        },
        
        
        data: {
          stock: {
            decrement: lote.cantidad,
          },
          id_modificacion: data.id_modificacion,
        },
      });
    }

    return nuevoRegistro;
  });
}
async listarRegistroProducto() {
   const x= await this.prisma.registroProducto.findMany({
    
    where: {
      estado: 'A',
    },

    include: {

      // =========================
      // EMERGENCIA
      // =========================
      emergencia: {
        include: {

          gravedad: true,

          voluntario: true,

          tiposEmergencia: {
            include: {
              tipoEmergencia: true,
            },
          },

          // vehículos usados
          vehiculos: {
            include: {
              vehiculo: true,
              maquinista: {
                include: {
                  voluntario: true,
                },
              },
            },
          },

          // materiales usados
          materiales: {
            include: {
              registroMaterial: true,
            },
          },

          // informes de emergencia
          informes: {
            include: {
              voluntario: true,
            },
          },

          // recepciones
          recepciones: {
            include: {
              voluntario: true,
            },
          },
        },
      },

      // =========================
      // LOTES RELACIONADOS
      // =========================
      lotes: {
        include: {

          loteProducto: {
            include: {

              // informes de ingreso
              informes: {
                include: {
                  voluntario: true,
                },
              },

              // registros relacionados
              registros: {
                include: {
                  registroProducto: {
                    include: {
                      emergencia: true,
                    },
                  },
                },
              },

              // contenedor informes
              contieneInformes: {
                include: {
                  informeIngreso: {
                    include: {
                      voluntario: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    orderBy: {
      id_registroProducto: 'desc',
    },
  });
  console.log(x,"**************************");
  
  return x;
}
async darBajaRegistroProducto(
    id_registroProducto: number,
    id_modificacion: number,
  ) {

    return await this.prisma.$transaction(async (tx) => {

      // =====================================
      // VERIFICAR EXISTENCIA
      // =====================================
      const existe = await tx.registroProducto.findUnique({
        where: {
          id_registroProducto,
        },

        include: {
          lotes: true,
        },
      });

      if (!existe) {
        throw new BadRequestException(
          'El registroProducto no existe',
        );
      }

      // =====================================
      // SI YA ESTÁ INACTIVO
      // =====================================
      if (existe.estado === 'I') {
        throw new BadRequestException(
          'El registroProducto ya está dado de baja',
        );
      }

      // =====================================
      // DEVOLVER STOCK A LOS LOTES
      // =====================================
      // Aquí asumimos que "cantidad"
      // fue descontada de cada lote.
      // Si luego guardas cantidades
      // individuales en la tabla intermedia,
      // deberías usar esa cantidad.
      // =====================================

      for (const lote of existe.lotes) {

        await tx.loteProducto.update({
          where: {
            id_loteProducto: lote.id_loteProducto,
          },

          data: {
            stock: {
              increment: existe.cantidad,
            },

            id_modificacion,
          },
        });
      }

      // =====================================
      // DAR BAJA TABLA INTERMEDIA
      // =====================================
      // SOLO SI TIENE CAMPO estado
      // =====================================

      /*
      await tx.lotProduc_proviene_regisProd.updateMany({
        where: {
          id_registroProducto,
        },

        data: {
          estado: 'I',
          id_modificacion,
        },
      });
      */

      // =====================================
      // DAR BAJA REGISTRO PRODUCTO
      // =====================================

      const baja = await tx.registroProducto.update({
        where: {
          id_registroProducto,
        },

        data: {
          estado: 'I',
          id_modificacion,
        },
      });

      return baja;
    });
  }


}
