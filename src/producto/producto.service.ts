import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ListarIngesosRealizadoPorVoluntario, ListarLote, ListarPorEmergenciaDto } from './dto/listar-producto.dto';
import { CrearLoteProductoDto } from './dto/crear-lote-producto.dto';
import { CrearIngresoProductoDto } from './dto/crear-ingreso-producto.dto';
import { VincularIngresoLoteDto, VinculoRegistroLoteProductoDto } from './dto/vinculos.dto';

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
      stock: data.stock
    }
  });
}
listarLotesProducto() {
  return this.prisma.loteProducto.findMany();
}
createIngresoProducto(data:CrearIngresoProductoDto) {
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
      id_voluntario: data.id_voluntario
    }
  });
}
listarIngresosProducto() {
  return this.prisma.informeIngresoProducto.findMany({
    include: {
      voluntario: true
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
}
