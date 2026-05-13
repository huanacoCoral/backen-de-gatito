import { Controller, Get, Param } from '@nestjs/common';
import { LogisticaService } from './logistica.service';

@Controller('logistica')
export class LogisticaController {

     constructor(
    private readonly dashboardService: LogisticaService,
  ) {}

  @Get('emergencias-por-mes/:anio')
  emergenciasPorMes(
    @Param('anio') anio: number,
  ) {
    return this.dashboardService.emergenciasPorMes(
      Number(anio),
    );
  }
  @Get('tipos-emergencia')
tiposEmergencia(){

  return this.dashboardService.tiposEmergencia();
}
@Get('vehiculos-mas-usados')
vehiculosMasUsados(){

  return this.dashboardService.vehiculosMasUsados();
}
}
