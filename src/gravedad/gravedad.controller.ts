import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGravedadDto } from './dto/create-gravedad.dto';
import { GravedadService } from './gravedad.service';

@Controller('gravedad')
export class GravedadController {
     constructor(private readonly gravedadService: GravedadService) {}

  @Post()
  crear(@Body() dto: CreateGravedadDto) {   
    return this.gravedadService.crear(dto);
  }

  @Get()
  listar() {
    return this.gravedadService.listar();
  }
   @Post('editar')
  editar(@Body() dto: CreateGravedadDto) {   
    return this.gravedadService.editar(dto);
  }
}
