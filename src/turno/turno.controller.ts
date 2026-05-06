import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CrearTurnoDto } from './dto/crear-turno.dto';
import { CrearCargoDto, UpdateTurnoTrayectoDto } from './dto/asignar-turno.dto';
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
          @Get('listar-Turnos-Trayecto') // lista turnos
          findAllTurnos() {
            return this.turnoService.listarTurnosTrayecto();
          }
    
          @Post('asignar-turno')
          asignarTurno(@Body() dto: CrearCargoDto){
            return this.turnoService.asignarTurno(dto);
          }

          @Put('editar-asignar-turno/:id')
          editarTurno(@Param('id') id: string,@Body() dto: UpdateTurnoTrayectoDto){
            return this.turnoService.editarAsignarTurno(+id,dto);
          }
    
        @Get('historial-turnos')
          historialTurnos(@Body() id_voluntario: AsignarTurnosDto) {
            return this.turnoService.historialTurnos(id_voluntario);
          }
        
        @Post('listar-trayectoria-turnos')
          listarTrayectoroariTurno(@Body() dto: any){
            return this.turnoService.listarTrayectoroariTurno(dto);
          }

          @Post('rango-turno-trayecto')
          async listarTurnoTrayecto( @Body() dto: any) {
            console.log("---->",dto);
            
            if (!dto.inicio || !dto.fin) {
              throw new BadRequestException('Las fechas de inicio y fin son obligatorias');
            }

            const fechaInicio = new Date(dto.inicio);
            const fechaFin = new Date(dto.fin);

            return await this.turnoService.listarPorRango(fechaInicio, fechaFin);
          }
          
}
