import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AsignarVehiculoDto } from './dto/create-asignarVehiculo.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AsignarVehiculoService } from './asignar-vehiculo.service';

@Controller('asignar-vehiculo')
export class AsignarVehiculoController {
      constructor(private readonly asignarVehiculoService: AsignarVehiculoService){}
//@UseGuards(AuthGuard, RolesGuard)
//@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
@Post()
asignarVehiculo(@Body() dto: AsignarVehiculoDto) {
  return this.asignarVehiculoService.asignarVehiculo(dto);
}

 @Get()
    listar(){
        return this.asignarVehiculoService.listar();
    }
}
