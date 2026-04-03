import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreateVoluntarioDto } from './dto/create-voluntario.dto';
import { ActualizaVoluntarioDto } from './dto/actualizar-voluntario.dto';
//import { UpdateVoluntarioDto } from './dto/actualizar-voluntario.dto';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}
  @Get()
    listar() {
      return this.personalService.listarVoluntarios();
  }
  @Get('listar')
    listarPersonal() {
      return this.personalService.listarPersonal();
  }
  
  @Get('listar_de_baja')
    listarPersonalDeBaja() {
      return this.personalService.listarPersonalDeBaja();
  }
  @Post()
  crear(@Body() dto: CreateVoluntarioDto) {
    console.log("crear personal");
    
    return this.personalService.crearVoluntario(dto);
  }

  

  @Post("actualizar")
  actualizarVoluntario(@Body() dto: ActualizaVoluntarioDto){
    return this.personalService.actualizarVoluntario(dto);
  }
  @Post("eliminar")
  eliminar(@Body() dto: ActualizaVoluntarioDto){
    return this.personalService.eliminar(dto);
  }
  
  @Get("listar_rol")
  listarRol(){
    return this.personalService.listarRol();
  }
   @Get('listar_cargo')
  listarCargo(){
    return this.personalService.listarCargo();
  }

  @Post('agregar_rol')
  agregarRol(@Body() dto: any){
    return this.personalService.agregarRol(dto);
  }
  
 @Post('agregar_cargo')
  agregarCargo(@Body() dto: any){
    return this.personalService.agregarCargo(dto);
  }
  
  //turno 
  @Get('listar_turno')
  listarTurno(){
    return this.personalService.listarTurno();
  }
}