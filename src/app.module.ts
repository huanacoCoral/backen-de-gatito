import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PersonalModule } from './personal/personal.module';
import { InventarioModule } from './inventario/inventario.module';
import { LogisticaController } from './logistica/logistica.controller';
import { LogisticaService } from './logistica/logistica.service';
import { OperacionesService } from './operaciones/operaciones.service';
import { OperacionesController } from './operaciones/operaciones.controller';
import { VehiculosController } from './vehiculos/vehiculos.controller';
import { VehiculosService } from './vehiculos/vehiculos.service';
import { RolModule } from './rol/rol.module';
import { EmergenciasModule } from './emergencias/emergencias.module';
import { GravedadModule } from './gravedad/gravedad.module';
import { AsignarVehiculoController } from './asignar-vehiculo/asignar-vehiculo.controller';
import { AsignarVehiculoModule } from './asignar-vehiculo/asignar-vehiculo.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { MaquinistaModule } from './maquinista/maquinista.module';
import { MaterialController } from './material/material.controller';
import { MaterialModule } from './material/material.module';
import { TurnoModule } from './turno/turno.module';
import { CargoService } from './cargo/cargo.service';
import { CargoModule } from './cargo/cargo.module';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    PersonalModule,
    InventarioModule,
    RolModule,
    EmergenciasModule,
    GravedadModule,
    AsignarVehiculoModule,
    VehiculosModule,
    MaquinistaModule,
    MaterialModule,
    TurnoModule,
    CargoModule,
    ProductoModule,
  ],
  controllers: [AppController, ProductoController, LogisticaController],
  providers: [AppService, CargoService, ProductoService, LogisticaService],
})
export class AppModule {}
