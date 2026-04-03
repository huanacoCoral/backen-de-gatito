import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) {}
    @Post()
    crear(@Body('nombre') nombre: string) {
    return this.rolService.crear(nombre);
    }

    @Get()
    listar() {
    return this.rolService.listar();
    }

}
