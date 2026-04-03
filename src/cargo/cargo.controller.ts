import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearCargoDto } from './dto/create-cargo.dto';
import { CargoService } from './cargo.service';
import { AsignarCargoDto } from './dto/asignar-cargo.dto';
import { ListarCargosDto } from './dto/listar-cargo.dto';

@Controller('cargo')
export class CargoController {
    constructor(private readonly cargoService: CargoService){}
    //
    @Post()
    crear(@Body() dto: CrearCargoDto) {
        return this.cargoService.crear(dto );
      }
    
      //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
      //@UseGuards(AuthGuard, RolesGuard)
    //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
      @Get()
      listar() {
        return this.cargoService.listar();
      }

      @Post('asignar-cargo')
      asignarCargo(@Body() dto: AsignarCargoDto){
        return this.cargoService.asignarCargo(dto);
      }

    @Post('historial-cargos')
      historialCargos(@Body() id_voluntario: ListarCargosDto) {
        return this.cargoService.historialCargos(id_voluntario);
      }
}
