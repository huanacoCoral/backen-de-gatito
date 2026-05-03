import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductoService } from './producto.service';
import { ListarIngesosRealizadoPorVoluntario, ListarLote, ListarPorEmergenciaDto } from './dto/listar-producto.dto';
import { CrearLoteProductoDto } from './dto/crear-lote-producto.dto';
import { CrearIngresoProductoDto } from './dto/crear-ingreso-producto.dto';
import { VincularIngresoLoteDto, VinculoRegistroLoteProductoDto } from './dto/vinculos.dto';

@Controller('producto')
export class ProductoController {

 constructor(private productoService: ProductoService) {}

    @Post('crear-resgistro-producto')   
    createRegistroProducto(@Body() dto: CrearProductoDto) {
        return this.productoService.createRegistroProducto(dto );
    }
    
      //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
      //@UseGuards(AuthGuard, RolesGuard)
    //@Roles('OPERADOR', 'LOGISTICA', 'COMANDANTE')
      @Post('productos-por-Emergencia')
    productosPorEmergencia(@Body() dto: ListarPorEmergenciaDto) {
        return this.productoService.productosPorEmergencia(dto);
      }    
      @Post('create-lote-producto')   
    createLoteProducto(@Body() dto: CrearLoteProductoDto) {
        return this.productoService.createLoteProducto(dto );
      }

      @Get("listar-lotes-producto")   
    listarLotesProducto() {
        return this.productoService.listarLotesProducto();
      }
      
      @Put('actualizar-lote-producto/:id')   
    actualizarLoteProducto(@Param('id') id: string,@Body() dto: CrearLoteProductoDto) {
        return this.productoService.actualizarLoteProducto(+id,dto );
      }
      @Post('crear-ingreso-producto')   
    createIngresoProducto(@Body() dto: CrearIngresoProductoDto) {
        return this.productoService.createIngresoProducto(dto );
      }
      @Get('listar-ingreso-producto')   
    listarIngresosProducto() {
        return this.productoService.listarIngresosProducto( );
      }

      @Put('actualizar-ingreso-producto/:id')   
    actualizarIngresoProducto(@Param('id') id: string,@Body() dto: any) {
        return this.productoService.actualizarIngresoProducto(+id,dto );
      }
      @Put('eliminar-ingreso-producto/:id')   
    eliminarIngresoProducto(@Param('id') id: string,@Body() dto: any) {
        return this.productoService.eliminarIngresoProducto(+id,dto );
      }


      

      @Post('crear-resgistro-producto')   
    vincularIngresoLoteProducto(@Body() dto: VincularIngresoLoteDto) {
        return this.productoService.vincularIngresoLoteProducto(dto );
      }
      @Post('vincular-resgistro-producto')   
    vincularRegistroProductoLote(@Body() dto: VinculoRegistroLoteProductoDto) {
        return this.productoService.vincularRegistroProductoLote(dto );
      }
      @Post('stock-producto')   
    stockProducto() {
        return this.productoService.stockProducto( );
      }
      @Post('crear-resgistsrso-producto')   
    historialLoteProducto(@Body() dto: ListarLote) {
        return this.productoService.historialLoteProducto(dto );
      }
      /*@Post('crear-resgistro-producto')   
    ingresosProductoPorVoluntario(@Body() dto: ListarIngesosRealizadoPorVoluntario) {
        return this.productoService.ingresosProductoPorVoluntario(dto );
      }*/
     


}
