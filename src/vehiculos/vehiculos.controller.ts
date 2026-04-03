import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculos.dto';
import { VehiculosService } from './vehiculos.service';
import { IngresoVehiculoDto } from './dto/ingreso-vehiculo.dto';
import { CrearLoteVehiculoDto } from './dto/crear-lote.dto';
import { RegistrarConduccionDto } from './dto/registrar-conduccion.dto';
import { MantenimientoDto } from './dto/mantenimiento.dto';
import { VincularIngresoLoteDto } from './dto/vincular-ingreso-lote.dto';

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
    //lotes del vehiculo 
    @Post('lote')
crearLote(@Body() dto: CrearLoteVehiculoDto) {
  return this.vehiculoService.crearLote(dto);
}
@Post('lote-ingreso')
vincularIngreso(@Body() dto: VincularIngresoLoteDto) {
  return this.vehiculoService.vincularIngresoALote(dto);
}
@Post('conduccion')
registrarConduccion(@Body() dto: RegistrarConduccionDto) {
  return this.vehiculoService.registrarConduccion(dto);
}
@Post('mantenimiento')
registrarMantenimiento(@Body() dto: MantenimientoDto) {
  return this.vehiculoService.registrarMantenimiento(dto);
}

@Get()
listar() {
  return this.vehiculoService.listar();
}



}
