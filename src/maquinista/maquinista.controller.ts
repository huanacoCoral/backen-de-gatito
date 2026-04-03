import { Body, Controller, Get, Post } from '@nestjs/common';
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

}
