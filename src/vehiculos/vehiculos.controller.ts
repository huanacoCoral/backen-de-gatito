import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculos.dto';
import { VehiculosService } from './vehiculos.service';
import { IngresoVehiculoDto } from './dto/ingreso-vehiculo.dto';
import { CrearLoteVehiculoDto } from './dto/crear-lote.dto';
import { RegistrarConduccionDto } from './dto/registrar-conduccion.dto';
import { MantenimientoDto } from './dto/mantenimiento.dto';
import { CrearVehiParticipoEmerDto, VincularIngresoLoteDto } from './dto/vincular-ingreso-lote.dto';

@Controller('vehiculos')
export class VehiculosController {
    constructor(private readonly vehiculoService:VehiculosService){
    }
    @Post()
        crearVehiculo(@Body()dto: CreateVehiculoDto){
            return this.vehiculoService.crearVehiculo(dto);
        }
    /*@Get()
    listar(){
        return this.vehiculoService.listarVER();
    }*/
    //regitrar el ingreso del vehicuo
    @Post('ingreso')
    registrarIngreso(@Body() dto: IngresoVehiculoDto) {
    return this.vehiculoService.registrarIngreso(dto);
    }
    @Get('ingreso')
        findAll() {
          return this.vehiculoService.listarIngresosVehiculos();
      }
    @Put('ingreso-editar/:id')
    editar (@Param('id') id: string,@Body() dto: IngresoVehiculoDto) 
    { return this.vehiculoService.editarIngresosVehiculos(+id,dto);}

     @Put('eliminar-editar/:id')
    eliminar (@Param('id') id: string,@Body() dto: any) 
    { return this.vehiculoService.eliminarIngresosVehiculos(+id,dto);}
    //lotes del vehiculo 
   /* @Get('lote')
listarLote() {
  return this.vehiculoService.listarLote();
}*/

   /* @Post('lote')
crearLote(@Body() dto: CrearLoteVehiculoDto) {
  return this.vehiculoService.crearLote(dto);
}*/
/*
@Post('lote-ingreso')
vincularIngreso(@Body() dto: VincularIngresoLoteDto) {
  return this.vehiculoService.vincularIngresoALote(dto);
}*/
@Post('conduccion')
registrarConduccion(@Body() dto: RegistrarConduccionDto) {
  return this.vehiculoService.registrarConduccion(dto);
}
@Post('mantenimiento')
registrarMantenimiento(@Body() dto: MantenimientoDto) {
  return this.vehiculoService.registrarMantenimiento(dto);
}

@Get('vehiculo')
listar() {
  return this.vehiculoService.listarVehiculo();
}
@Post('/vehiculo-emergencia')
crearVehiculoEmergencia(
  @Body() dto: CrearVehiParticipoEmerDto
) {
  return this.vehiculoService.crearVehiculoEmergencia(dto);
}
@Post('/crear-participacion')
  crearParticipacion(
    @Body() body: any
  ) {

    return this.vehiculoService.crearParticipacion(body);

  }


  //------
  @Post('listar-mantenimiento')
  listarMantenimiento(@Body() dto: any) {
    return this.vehiculoService.listarMantenimiento(dto);
  }

  // =========================
  // ✅ CREAR
  // =========================
  @Post('crear-mantenimiento')
  crearMantenimiento(@Body() dto: any) {
    return this.vehiculoService.crearMantenimiento(dto);
  }

  // =========================
  // ✏️ EDITAR
  // =========================
  @Put('editar-mantenimiento')
  actualizarMantenimiento(@Body() dto: any) {
    return this.vehiculoService.actualizarMantenimiento(dto);
  }

  // =========================
  // ❌ ELIMINAR (SOFT DELETE)
  // =========================
   @Put('eliminar-mantenimiento/:id')
  eliminarMantenimiento(
    @Param('id') id: string,
    @Body() dto: any
  ) {
    return this.vehiculoService.eliminarMantenimiento(Number(id), dto);
  }

}
