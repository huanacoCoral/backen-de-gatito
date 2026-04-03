import { Body, Controller, Post, UseGuards,  Get, Request, } from '@nestjs/common';
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
@UseGuards(AuthGuard, RolesGuard)
@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
@Post()
crear(@Body() dto: CreateEmergenciaDto, @Request() req) {
    const id_voluntario = req.user.id_voluntario;
    return this.emergenciasService.crear(dto, id_voluntario);
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

}