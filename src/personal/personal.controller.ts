import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreateVoluntarioDto } from './dto/create-voluntario.dto';
import { ActualizaVoluntarioDto } from './dto/actualizar-voluntario.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
//import { UpdateVoluntarioDto } from './dto/actualizar-voluntario.dto';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}
  @Get()
    listar() {
      return this.personalService.listarVoluntarios();
  }
   @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL', 'LOGISTICA','OPERACIONES', 'JEFE_GUARDIA','COMANDANTE')
  @Get('listar')
    listarPersonal() {
      return this.personalService.listarPersonal();
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','COMANDANTE')
  @Get('listar_de_baja')
    listarPersonalDeBaja() {
      return this.personalService.listarPersonalDeBaja();
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL')
  @Post()
  crear(@Body() dto: CreateVoluntarioDto) {
    console.log("crear personal");
    
    return this.personalService.crearVoluntario(dto);
  }

  
@UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL')
  @Post("actualizar")
  actualizarVoluntario(@Body() dto: ActualizaVoluntarioDto){
    return this.personalService.actualizarVoluntario(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL')
  @Post("eliminar")
  eliminar(@Body() dto: ActualizaVoluntarioDto){
    return this.personalService.eliminar(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL')
  @Post("activar")
  activar(@Body() dto: ActualizaVoluntarioDto){
    return this.personalService.activar(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','OPERACIONES')
  @Get("listar_rol")
  listarRol(){
    return this.personalService.listarRol();
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','OPERACIONES')
   @Get('listar_cargo')
  listarCargo(){
    return this.personalService.listarCargo();
  }
@UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','OPERACIONES')
  @Post('agregar_rol')
  agregarRol(@Body() dto: any){
    return this.personalService.agregarRol(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','OPERACIONES')
 @Post('agregar_cargo')
  agregarCargo(@Body() dto: any){
    return this.personalService.agregarCargo(dto);
  }
  @UseGuards(AuthGuard, RolesGuard)
      @Roles('PERSONAL','OPERACIONES')
  //turno 
  @Get('listar_turno')
  listarTurno(){
    return this.personalService.listarTurno();
  }
}