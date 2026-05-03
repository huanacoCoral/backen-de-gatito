import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearTurnoDto } from './dto/crear-turno.dto';
import { CrearCargoDto } from './dto/asignar-turno.dto';
import { TurnoService } from './turno.service';
import { AsignarTurnosDto } from './dto/listar-turnos.dto';

@Controller('turno')
export class TurnoController {
    constructor(private turnoService: TurnoService) { }
    
     @Post()
        createTurno(@Body() dto: CrearTurnoDto) {
          console.log("---",dto);
          
            return this.turnoService.createTurno(dto );
          }
        
          //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
          //@UseGuards(AuthGuard, RolesGuard)
        //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
          @Get() // lista turnos
          findAllTurnos() {
            return this.turnoService.findAllTurnos();
          }
    
          @Post('asignar-turno')
          asignarTurno(@Body() dto: CrearCargoDto){
            return this.turnoService.asignarTurno(dto);
          }
    
        @Get('historial-turnos')
          historialTurnos(@Body() id_voluntario: AsignarTurnosDto) {
            return this.turnoService.historialTurnos(id_voluntario);
          }
        
        @Post('listar-trayectoria-turnos')
          listarTrayectoroariTurno(@Body() dto: any){
            return this.turnoService.listarTrayectoroariTurno(dto);
          }
}
