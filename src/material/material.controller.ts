import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateInformeMaterialDto } from './dto/create-material.dto';
import { CrearLoteMaterialDto } from './dto/crear-lote.dto';
import { CrearEmergenciaUtilizoMaterialRegistradoDto, loteMatContiInformMateriDto } from './dto/crear-relacion.dto';
import { CrearRegistroMaterialDto } from './dto/crear-registro-material.dto';
import { get } from 'http';

@Controller('material')
export class MaterialController {
    constructor (private readonly materialService:MaterialService){}

    
    
    @Post('crear-ingresar-material')
    crearIngresarMaterial(@Body() dto:CreateInformeMaterialDto){
        return this.materialService.crearIngresarMaterial(dto)
    }
    
    @Post('actualizar-ingresar-material-:id')
    actualizarMaterial(@Param('id') id: string,@Body() dto:CreateInformeMaterialDto){
        return this.materialService.actualizarMaterial(+id,dto)
    }
    @Post('crear-lote')
    crearLote(@Body() dto: CrearLoteMaterialDto){
        return this.materialService.crearLote(dto)
    }
    /*@Post('relacion-loteMater-contiene-inInfMaterial')
    relacionLoteMaterContieneInInfMaterial(@Body() dto: loteMatContiInformMateriDto){
        return this.materialService.relacionLoteMaterContieneInInfMaterial(dto);
    }*/
   @Patch('actualizarlote-:id') // Usamos PATCH para actualizaciones parciales
        async update(@Param('id') id: string, @Body() dto: any) {
        return await this.materialService.actualizarLote(+id, dto);
        }
   

    /*@Post('crear-registro-material')
    relacionRegistroMaterial(@Body() dto: CrearRegistroMaterialDto){
        return this.materialService.relacionRegistroMaterial(dto);
    }*/
    @Post('relacion-emergencia-utilizo-material')
    relacionEmergenciaUtilizoMaterial(@Body() dto: CrearEmergenciaUtilizoMaterialRegistradoDto){
        return this.materialService.relacionEmergenciaUtilizoMaterial(dto);
    }
     @Get('listar-infomres-ingresoMaterial')
    listarInformeIngresoMaterial(){
        return this.materialService.listarInformeIngresoMaterial();
    }
     @Get('listar-loteMaterial')
    loteMaterialConInformeMaterial(){
        return this.materialService.loteMaterialConInformeMaterial();
    }
    /* @Get('listar-registroMaterial')
    listarRegistroMaterial(){
        return this.materialService.listarRegistroMaterial();
    }*/
   
    @Get ('pruebas')
    contiene(){
        return this.materialService.contiene();
    }

    @Get('listar-lote-material')
    listarLoteMaterial(){
        return this.materialService.listarLoteMaterial();
    }

    //---registro material
    // CREAR
  @Post('crear-registroMaterial')
  crearRegistroMaterial(
    @Body() data: CrearRegistroMaterialDto
  ) {

    return this.materialService.crearRegistroMaterial(data);

  }

  // LISTAR
  @Get('listar-registroMaterial')
  listarRegistroMaterial() {

    return this.materialService.listarRegistroMaterial();

  }
  

  @Post('crear-reg-material-lote')
crear(@Body() data: any) {
  return this.materialService.crearResitroMaterTieneLote(data);
}

@Post('editar-reg-material-lote')
editarResitroMaterTieneLote( @Body() data: any) {

  return this.materialService.editarResitroMaterTieneLote(data);

}
@Post('eliminar-asignacion')
eliminarAsignacionMaterial(
  @Body() data: any
) {

  return this.materialService.eliminarAsignacionMaterial(data);

}
}
