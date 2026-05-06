import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMaquinistaDto } from './dto/create-maquinista.dto';
import { MaquinistaService } from './maquinista.service';

@Controller('maquinista')
export class MaquinistaController {
    constructor(private readonly maquinistaService: MaquinistaService) { }
    @Post()
    crearMaquinista(@Body() dto: CreateMaquinistaDto) {
        return this.maquinistaService.crearMaquinista(dto);
    }
    @Get()
    listar() {
        return this.maquinistaService.listar();
    }
    @Patch('editar/:id')
    editar(@Param('id') id: string, @Body() dto: any) {
    return this.maquinistaService.editar(+id, dto);
    }
    
    @Patch('volver-A/:id')
    maquinistaVolverActivar(@Param('id') id: string, @Body() dto: any) {
    return this.maquinistaService.maquinistaVolverActivar(+id, dto);
    }

    @Patch('eliminar/:id') // Usamos Patch porque es una baja lógica (update de estado)
    eliminar(@Param('id') id: string, @Body() dto: any) {
    return this.maquinistaService.eliminar(+id, dto);
    }
}
