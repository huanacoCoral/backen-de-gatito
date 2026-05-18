import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) {}
    @Post('crear')
    crear(@Body() dto: any) {
    return this.rolService.crear(dto);
    }

     @Post('editar')
    editar(@Body() dto: any) {
    return this.rolService.editar(dto);
    }

    @Get()
    listar() {
    return this.rolService.listar();
    }
    @Post('editar-rol')
    editarRol(
    @Body() data:any){
    return this.rolService.editarRol(data);
    }
}
