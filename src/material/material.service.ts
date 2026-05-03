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
async relacionRegistroMaterial(dto:CrearRegistroMaterialDto){
  return this.prisma.registroMaterial.create({
    data:{
      unidadMedida        :dto.unidadMedida,
      cantidadUnidad      :dto.cantidadUnidad,      
    }
  })
}
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
    return await this.prisma.loteMaterial.findMany();
  }

async listarRegistroMaterial(){
  return this.prisma.registroMaterial.findMany(
    {
    include:{emergenciasUso:true}
  }
  )
}
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


}