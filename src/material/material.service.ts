  import { BadRequestException, Injectable } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { CreateInformeMaterialDto } from './dto/create-material.dto';
  import { UsarMaterialDto } from './dto/usar-material.dto';
  import {  CrearLoteMaterialDto } from './dto/crear-lote.dto';
  import { CrearEmergenciaUtilizoMaterialRegistradoDto,  loteMatContiInformMateriDto } from './dto/crear-relacion.dto';
  import { CrearRegistroMaterialDto } from './dto/crear-registro-material.dto';

  @Injectable()
  export class MaterialService {

  constructor(private prisma: PrismaService) {}

  
    // INGRESO DE MATERIAL
    async crearIngresarMaterial(dto: CreateInformeMaterialDto) {
      return this.prisma.$transaction(async (tx) => { // $transaction :  se utiliza para agrupar múltiples operaciones de base de datos en una unidad atómica. Esto garantiza que, o bien todas las operaciones se completen con éxito, o bien ninguna de ellas se aplique (rollback),
        const informe = await tx.informeIngresoMaterial.create({
        data:{
              tipo:dto.tipo,
              estado:dto.estado,
              marca:dto.marca,
              modelo:dto.modelo,
              numSerie:dto.numSerie,
              fechaAdquisicion:new Date(dto.fechaAdquisicion),
              capacidad:dto.capacidad,
              caracteristicas:dto.caracteristicas,
              historial:dto.historial,
              responsableEquipo:dto.responsableEquipo,
              cantidad:dto.cantidad,
              cantidadUnidad:dto.cantidadUnidad,
              unidadMedida:dto.unidadMedida,
              fechaLimiteUso:new Date(dto.fechaLimiteUso),
              intervaloTiempoRevision:dto.intervaloTiempoRevision,
              id_voluntario:dto.id_voluntario,
              id_loteMaterial:dto.id_loteMaterial
          }
        });

        return {
          message: 'Material ingresado correctamente',
          informe,
          //lote,
        };
      });
    }
    

    async actualizarMaterial(id: number, dto: CreateInformeMaterialDto) {
    return await this.prisma.informeIngresoMaterial.update({
      where: { 
        id_informeIngresoMaterial: id // Aquí va la columna que es llave primaria en tu tabla
      },
      data: dto
    });
  }
  async eliminarMaterial(id: number, dto:any) {
    return await this.prisma.informeIngresoMaterial.update({
      where: { 
        id_informeIngresoMaterial: id // Aquí va la columna que es llave primaria en tu tabla
      },
      data: {
        estado:dto.estado,
      }
    });
  }

    //crear lote 
  async crearLote(dto: CrearLoteMaterialDto){
    return this.prisma.loteMaterial.create({
      data:dto
    })
  }
  //crear loteMaterial que Contiene Informacion de Ingreso del Material
  /*async relacionLoteMaterContieneInInfMaterial(dto: loteMatContiInformMateriDto){
    return this.prisma.lotMater_contiene_infIngMater.create({
      data:{
        id_loteMaterial           :dto.id_loteMaterial,
        id_informeIngresoMaterial :dto.id_informeIngresoMaterial,
      }
    })
    
  }*/
  async actualizarLote(id: number, dto: any) {
    return await this.prisma.loteMaterial.update({
      where: {
        id_loteMaterial: id // Asegúrate que el nombre coincida con tu schema.prisma
      },
      data: dto
    });
  }

  //crear entidad Registrar Material
  /*async relacionRegistroMaterial(dto:CrearRegistroMaterialDto){
    return this.prisma.registroMaterial.create({
      data:{
        unidadMedida        :dto.unidadMedida,
        cantidadUnidad      :dto.cantidadUnidad,      
      }
    })
  }*/
  // relacion Emergencia Utilizo Registro material
  async relacionEmergenciaUtilizoMaterial(dto:CrearEmergenciaUtilizoMaterialRegistradoDto){
  return this.prisma.emergencia_utilizo_registroMaterial.create({
    data:dto
  })
  }

  //listar

  /*async listarInformeIngresoMaterial(){
    return this.prisma.informeIngresoMaterial.findMany({
      include: {
        voluntario: {
          select: {
            id_voluntario: true,
            nombre: true,
            apellido_paterno: true,
          },
        },
        loteMaterial: true,
        lotesContenedor: {
          include: {
            loteMaterial: true,
          },
        },
      },
      orderBy: {
        fechaAdquisicion: 'desc',
      },
    });
  }*/
  async listarInformeIngresoMaterial(){
    return this.prisma.informeIngresoMaterial.findMany({
      where:{
        estado: { not: 'B' },
      },
      include: {
        voluntario: {
          select: {
            id_voluntario: true,
            nombre: true,
            apellido_paterno: true,
          },
        },
        loteMaterial: true,
        lotesContenedor: {
          include: {
            loteMaterial: true,
          },
        },
      },
      orderBy: {
        fechaAdquisicion: 'desc',
      },
    });
  }

  async loteMaterialConInformeMaterial(){
    return this.prisma.loteMaterial.findMany({
      include: {
        informes: true,
        _count: {
          select: {
            informes: true,
            registros: true,
          },
        },
      },
    });
  }
    async listarLoteMaterial(){
      return await this.prisma.loteMaterial.findMany({
        where:{
        estado: { not: 'B' },
      }
      });
    }

  /*async listarRegistroMaterial(){
    return this.prisma.registroMaterial.findMany(
      {
      include:{emergenciasUso:true}
    }
    )
  }*/
  async contiene(){
    return this.prisma.$transaction(async (tx) => { // $transaction :  se utiliza para agrupar múltiples operaciones de base de datos en una unidad atómica. Esto garantiza que, o bien todas las operaciones se completen con éxito, o bien ninguna de ellas se aplique (rollback),
        const informe = await tx.informeIngresoMaterial.findMany({
        
        });
        const contiene = await tx.lotMater_contiene_infIngMater.findMany({
        
        });
        const lote = await tx.loteMaterial.findMany({
        
        });
        
    const loteMaterialConInforme=this.prisma.loteMaterial.findMany({
      include: { 
        _count: {
          select: { informes: true }
        }
      }
    });
        return {
          message: 'Material ingresado correctamente',
          informe,
          contiene,
          lote,
          loteMaterialConInforme
        };
      });
  } 
  // CREAR REGISTRO
    async crearRegistroMaterial(data: CrearRegistroMaterialDto) {

      return await this.prisma.registroMaterial.create({
        data: {
        // cantidadUnidad: data.cantidadUnidad,
          //cantidadUsada: data.cantidadUsada,
          id_modificacion: data.id_modificacion
        }
      });

    }

    // LISTAR
    async listarRegistroMaterial() {
      console.log("---user");
      
    return await this.prisma.registroMaterial.findMany({
      where: {
        estado: 'A'
      },

      include: {

        // RELACIÓN CON LOTES
        lotes: {

          where: {
            estado: 'A'
          },

          include: {

            loteMaterial: true

          }

        },

        // RELACIÓN CON EMERGENCIAS
        emergenciasUso: {

          /*where: {--- creo que lista los vacios
            estado: 'A'
          },*/

          include: {

            emergencia: {
              include: {

                gravedad: true,
                voluntario: true,
                tiposEmergencia: {

                include: {

                  tipoEmergencia: true

                }

              }

              }
            }

          }

        }

      },

      orderBy: {
        id_registroMaterial: 'desc'
      }

    });

  }
    async crearResitroMaterTieneLote(data:any){

    return await this.prisma.regisMate_tiene_loteMatel.create({
      data: {
        id_registroMaterial: data.id_registroMaterial,
        id_loteMaterial: data.id_loteMaterial,
        id_modificacion: data.id_modificacion
      }
    });

  }

  async editarResitroMaterTieneLote(data: any) {

    return await this.prisma.regisMate_tiene_loteMatel.update({

      where: {
        id_registroMaterial_id_loteMaterial: {

          id_registroMaterial: data.id_registroMaterial,
          id_loteMaterial: data.id_loteMaterial

        }
      },

      data: {

        estado: data.estado,
        id_modificacion: data.id_modificacion

      }

    });


  }
  /*
  async eliminarAsignacionMaterial(data: any) {

    return await this.prisma.$transaction(async (tx) => {

      // 1. obtener registro
      const registro = await tx.registroMaterial.findUnique({
        where: {
          id_registroMaterial: data.id_registroMaterial
        }
      });

      if (!registro) {
        throw new Error('Registro no encontrado');
      }

      // 2. obtener lote
      const relacionLote = await tx.regisMate_tiene_loteMatel.findFirst({
        where: {
          id_registroMaterial: data.id_registroMaterial,
          estado: 'A'
        }
      });

      if (!relacionLote) {
        throw new Error('Relación lote no encontrada');
      }

      // 3. obtener lote real
      const lote = await tx.loteMaterial.findUnique({
        where: {
          id_loteMaterial: relacionLote.id_loteMaterial
        }
      });

      // 4. devolver stock
      await tx.loteMaterial.update({
        where: {
          id_loteMaterial: lote!.id_loteMaterial
        },

        data: {
          stock: lote!.stock + registro.cantidadUsada,
          id_modificacion: data.id_modificacion
        }
      });

      // 5. baja emergencia-registro
      await tx.emergencia_utilizo_registroMaterial.updateMany({

        where: {
          id_registroMaterial: data.id_registroMaterial,
          estado: 'A'
        },

        data: {
          estado: 'B',
          id_modificacion: data.id_modificacion
        }

      });

      // 6. baja registro-lote
      await tx.regisMate_tiene_loteMatel.updateMany({

        where: {
          id_registroMaterial: data.id_registroMaterial,
          estado: 'A'
        },

        data: {
          estado: 'B',
          id_modificacion: data.id_modificacion
        }

      });

      // 7. baja registroMaterial
      await tx.registroMaterial.update({

        where: {
          id_registroMaterial: data.id_registroMaterial
        },

        data: {
          estado: 'B',
          id_modificacion: data.id_modificacion
        }

      });

      return {
        message: 'Asignación eliminada correctamente'
      };

    });

  }*/

  ///-----------------------------------------------------------------------------------------
  // ======================================================
  // CREAR SALIDA MATERIAL
  // ======================================================





  
 async crearSalidaMaterial(data: {
  tipoMovimiento: string;
  destino?: string;
  observacion?: string;

  id_emergencia?: number;

  lotes: {
    id_loteMaterial: number;
    cantidad: number;
    unidad?: string;
  }[];

  id_modificacion?: number;
}) {

  return await this.prisma.$transaction(async (tx) => {

    // ==========================================
    // VALIDAR QUE EXISTAN LOTES
    // ==========================================

    if (!data.lotes || data.lotes.length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un lote',
      );
    }

    // ==========================================
    // VALIDAR STOCK DE TODOS LOS LOTES
    // ==========================================

    for (const item of data.lotes) {

      const lote = await tx.loteMaterial.findUnique({
        where: {
          id_loteMaterial: item.id_loteMaterial,
        },
      });

      if (!lote) {
        throw new BadRequestException(
          `El lote ${item.id_loteMaterial} no existe`,
        );
      }

      if (lote.stock < item.cantidad) {
        throw new BadRequestException(
          `Stock insuficiente para el lote ${item.id_loteMaterial}`,
        );
      }

    }

    // ==========================================
    // CREAR MOVIMIENTO PRINCIPAL
    // ==========================================

    const movimiento =
      await tx.registroMaterial.create({
        data: {
          tipoMovimiento: data.tipoMovimiento,
          destino: data.destino,
          observacion: data.observacion,
          id_modificacion: data.id_modificacion,
        },
      });

    // ==========================================
    // RELACIONAR EMERGENCIA
    // ==========================================

    if (data.id_emergencia) {

      await tx.emergencia_utilizo_registroMaterial.create({
        data: {
          id_emergencia: data.id_emergencia,
          id_registroMaterial:movimiento.id_registroMaterial,
          id_modificacion: data.id_modificacion,
        },
      });

    }

    // ==========================================
    // RECORRER LOTES
    // ==========================================

    for (const item of data.lotes) {

      // ==========================================
      // CREAR DETALLE
      // ==========================================

      await tx.regisMate_tiene_loteMatel.create({
        data: {
          id_registroMaterial:movimiento.id_registroMaterial,
          id_loteMaterial:item.id_loteMaterial,
          cantidad: item.cantidad,
          unidad: item.unidad,

          id_modificacion: data.id_modificacion,
        },
      });

      // ==========================================
      // DESCONTAR STOCK
      // ==========================================

      await tx.loteMaterial.update({
        where: {
          id_loteMaterial: item.id_loteMaterial,
        },

        data: {
          stock: {
            decrement: item.cantidad,
          },

          id_modificacion: data.id_modificacion,
        },
      });

    }

    // ==========================================
    // RETORNAR
    // ==========================================

    return movimiento;

  });

}









  // ======================================================
  // CREAR DEVOLUCION MATERIAL
  // ======================================================

  async crearDevolucionMaterial(data: {
  destino?: string;
  observacion?: string;

  lotes: {
    id_loteMaterial: number;
    cantidad: number;
    unidad?: string;
  }[];

  id_modificacion?: number;
}) {

  return await this.prisma.$transaction(async (tx) => {

    // ==========================================
    // VALIDAR LOTES
    // ==========================================

    if (!data.lotes || data.lotes.length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un lote',
      );
    }

    // ==========================================
    // VALIDAR EXISTENCIA DE LOTES
    // ==========================================

    for (const item of data.lotes) {

      const lote = await tx.loteMaterial.findUnique({
        where: {
          id_loteMaterial: item.id_loteMaterial,
        },
      });

      if (!lote) {
        throw new BadRequestException(
          `El lote ${item.id_loteMaterial} no existe`,
        );
      }

    }

    // ==========================================
    // CREAR MOVIMIENTO
    // ==========================================

    const movimiento =
      await tx.registroMaterial.create({
        data: {
          tipoMovimiento: 'DEVOLUCION',
          destino: data.destino,
          observacion: data.observacion,

          id_modificacion: data.id_modificacion,
        },
      });

    // ==========================================
    // RECORRER LOTES
    // ==========================================

    for (const item of data.lotes) {

      // ==========================================
      // CREAR DETALLE
      // ==========================================

      await tx.regisMate_tiene_loteMatel.create({
        data: {
          id_registroMaterial:
            movimiento.id_registroMaterial,

          id_loteMaterial:
            item.id_loteMaterial,

          cantidad: item.cantidad,
          unidad: item.unidad,

          id_modificacion: data.id_modificacion,
        },
      });

      // ==========================================
      // AUMENTAR STOCK
      // ==========================================

      await tx.loteMaterial.update({
        where: {
          id_loteMaterial: item.id_loteMaterial,
        },

        data: {
          stock: {
            increment: item.cantidad,
          },

          id_modificacion: data.id_modificacion,
        },
      });

    }

    return movimiento;

  });

}

  // ======================================================
  // REGISTRAR MATERIAL DAÑADO
  // ======================================================

  async registrarDanioMaterial(data: {
    destino?: string;
    observacion?: string;

    id_loteMaterial: number;
    cantidad: number;
    unidad?: string;

    id_modificacion?: number;
  }) {

    return await this.prisma.$transaction(async (tx) => {

      // ==========================================
      // VALIDAR LOTE
      // ==========================================

      const lote = await tx.loteMaterial.findUnique({
        where: {
          id_loteMaterial: data.id_loteMaterial,
        },
      });

      if (!lote) {
        throw new BadRequestException(
          'El lote no existe',
        );
      }

      // ==========================================
      // CREAR MOVIMIENTO
      // ==========================================

      const movimiento =
        await tx.registroMaterial.create({
          data: {
            tipoMovimiento: 'DAÑADO',
            destino: data.destino,
            observacion: data.observacion,

            id_modificacion: data.id_modificacion,
          },
        });

      // ==========================================
      // DETALLE
      // ==========================================

      await tx.regisMate_tiene_loteMatel.create({
        data: {
          id_registroMaterial:
            movimiento.id_registroMaterial,

          id_loteMaterial:
            data.id_loteMaterial,

          cantidad: data.cantidad,
          unidad: data.unidad,

          id_modificacion: data.id_modificacion,
        },
      });

      // NO MODIFICA STOCK

      return movimiento;

    });

  }

  // ======================================================
  // REGISTRAR MATERIAL PERDIDO
  // ======================================================

  async registrarPerdidaMaterial(data: {
    destino?: string;
    observacion?: string;

    id_loteMaterial: number;
    cantidad: number;
    unidad?: string;

    id_modificacion?: number;
  }) {

    return await this.prisma.$transaction(async (tx) => {

      // ==========================================
      // VALIDAR LOTE
      // ==========================================

      const lote = await tx.loteMaterial.findUnique({
        where: {
          id_loteMaterial: data.id_loteMaterial,
        },
      });

      if (!lote) {
        throw new BadRequestException(
          'El lote no existe',
        );
      }

      // ==========================================
      // CREAR MOVIMIENTO
      // ==========================================

      const movimiento =
        await tx.registroMaterial.create({
          data: {
            tipoMovimiento: 'PERDIDA',
            destino: data.destino,
            observacion: data.observacion,

            id_modificacion: data.id_modificacion,
          },
        });

      // ==========================================
      // DETALLE
      // ==========================================

      await tx.regisMate_tiene_loteMatel.create({
        data: {
          id_registroMaterial:
            movimiento.id_registroMaterial,

          id_loteMaterial:
            data.id_loteMaterial,

          cantidad: data.cantidad,
          unidad: data.unidad,

          id_modificacion: data.id_modificacion,
        },
      });

      // NO MODIFICA STOCK

      return movimiento;

    });

  }

  // ======================================================
  // DAR BAJA MOVIMIENTO MATERIAL
  // ======================================================

  async darBajaMovimientoMaterial(
    id_registroMaterial: number,
    id_modificacion: number,
  ) {

    return await this.prisma.$transaction(async (tx) => {

      // ==========================================
      // BUSCAR MOVIMIENTO
      // ==========================================

      const movimiento =
        await tx.registroMaterial.findUnique({
          where: {
            id_registroMaterial,
          },

          include: {
            lotes: true,
          },
        });

      if (!movimiento) {
        throw new BadRequestException(
          'Movimiento no encontrado',
        );
      }

      // ==========================================
      // VALIDAR ESTADO
      // ==========================================

      if (movimiento.estado === 'I') {
        throw new BadRequestException(
          'Movimiento ya inactivo',
        );
      }

      // ==========================================
      // REVERTIR STOCK SI ERA SALIDA
      // ==========================================

      if (
        movimiento.tipoMovimiento === 'SALIDA'
      ) {

        for (const item of movimiento.lotes) {
          if (item.cantidad == null) {
    throw new BadRequestException(
      'La cantidad no puede ser null',
    );
  }
          await tx.loteMaterial.update({
            where: {
              id_loteMaterial:
                item.id_loteMaterial,
            },

            data: {
              stock: {
                increment: item.cantidad,
              },

              id_modificacion,
            },
          });

        }

      }

      // ==========================================
      // REVERTIR DEVOLUCION
      // ==========================================

      if (
        movimiento.tipoMovimiento === 'DEVOLUCION'
      ) {

        for (const item of movimiento.lotes) {
  if (item.cantidad == null) {
    throw new BadRequestException(
      'La cantidad no puede ser null',
    );
  }
          await tx.loteMaterial.update({
            where: {
              id_loteMaterial:
                item.id_loteMaterial,
            },

            data: {
              stock: {
                decrement: item.cantidad,
              },

              id_modificacion,
            },
          });

        }

      }

      // ==========================================
      // DAR BAJA DETALLE
      // ==========================================

      await tx.regisMate_tiene_loteMatel.updateMany({
        where: {
          id_registroMaterial,
        },

        data: {
          estado: 'I',
          id_modificacion,
        },
      });

      // ==========================================
      // DAR BAJA MOVIMIENTO
      // ==========================================

      return await tx.registroMaterial.update({
        where: {
          id_registroMaterial,
        },

        data: {
          estado: 'I',
          id_modificacion,
        },
      });

    });

  }


  }