import { Body, Controller, Post, UseGuards,  Get, Request, Query, Put, Param, } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateEmergenciaDto } from './dto/create-emergencias.dto';
import { EmergenciasService } from './emergencias.service';
import { CrearTipoEmergenciaDto } from './dto/crear-tipo-emergencia.dto';
import { AsignarTipoEmergenciaDto } from './dto/asignar-tipo-emergencia.dto';
import { VolRecepcionaEmergenciaDto } from './dto/vol-recepciona-emergencia.dto';
import { CrearInformeEmergenciaDto } from './dto/crear-informe-emergencia.dto';


@Controller('emergencias')
export class EmergenciasController {
  constructor(private readonly emergenciasService: EmergenciasService){}
//
//@UseGuards(AuthGuard, RolesGuard)
//@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
@Post()
crear(
  @Body() dto: CreateEmergenciaDto, 
  //@Request() req
) {
  //console.log("xxxxx",req);
    //console.log("111111r",req.user);
    //const id_voluntario = req.user.id_voluntario;// podemos buscarlo e mplementarlo pero funciona si neso e igual solo registra si es parte de voluntario
    return this.emergenciasService.crear(dto);
  }

  //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
  //@UseGuards(AuthGuard, RolesGuard)
//@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
  @Get()
  listar() {
    return this.emergenciasService.listar();
  }

  //
  @Post('tipo-emergencia')
crearTipo(@Body() dto: CrearTipoEmergenciaDto) {
  return this.emergenciasService.crearTipoEmergencia(dto);
}

@Get('tipo-emergencia')
listarTipos() {
  return this.emergenciasService.listarTiposEmergencia();
}

 @Post('editar-tipo-emergencia')
editarTipoEmergencia(@Body() dto: CrearTipoEmergenciaDto) {
  return this.emergenciasService.editarTipoEmergencia(dto);
}
@Post('eliminar-tipo-emergencia')
eliminarTipoEmergencia(@Body() dto: CrearTipoEmergenciaDto) {
  return this.emergenciasService.eliminarTipoEmergencia(dto);
}

//estamos asignando el tipo a emergencia 
@Post('asignar-tipo')
asignarTipo(@Body() dto: AsignarTipoEmergenciaDto) {
  return this.emergenciasService.asignarTipoEmergencia(dto);
}
//voluntario que recepciono o atendio la emergencia CREO Q ERAN PARTICIPANTES
@Post('recepcion')
recepcionarEmergencia(@Body() dto: VolRecepcionaEmergenciaDto) {
  return this.emergenciasService.voluntarioRecepcionaEmergencia(dto);
}
//listar todo
@Get('listar-mergencias')
listarEmergencias() {
  return this.emergenciasService.listarEmergencias();
}
//informe
@Post('informe')
crearInformeEmergencia(@Body() dto: CrearInformeEmergenciaDto) {
  return this.emergenciasService.crearInformeEmergencia(dto);
}

@Get('listar-informe-mergencias')
listarInformeEmergencias() {
  return this.emergenciasService.listarInformeEmergencias();
}
//
  @Get('listar-voluntario-disponible')
  listarVoluntariodisponible(
    @Query('fecha') fecha: string, 
    @Query('dia') dia: number, 
  @Query('hora') hora: string,

  ) {
    return this.emergenciasService.listarVoluntariosDisponibles(fecha,dia, hora);
  }
//-*
// EDITAR
@Put(':id')
editarEmergenciaCompleta(
 @Param('id') id: string,@Body() data: any
) {

  return this.emergenciasService.editarEmergenciaCompleta(
    Number(id),
    data
  );

}

// ELIMINAR
@Put('eliminar/:id')
eliminarEmergencia(@Param('id') id: string,@Body() data: any) {
  return this.emergenciasService.eliminarEmergencia(
    Number(id),
    data.id_modificacion
  );

}

@Post('informe-emergencia-termino')
  crearInformeEmergenciaTermino(@Body() dto: any) {
    return this.emergenciasService.crearInformeEmergenciaTermino(dto);
  }

  @Post('actualiza-infrome-emergencia-termino')
  actualizaactualizarInformeEmergenciaTerminor(@Body() dto: any) {
    return this.emergenciasService.actualizarInformeEmergenciaTermino(dto);
  }

}