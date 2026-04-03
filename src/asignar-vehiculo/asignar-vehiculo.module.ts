import { Module } from '@nestjs/common';
import { AsignarVehiculoService } from './asignar-vehiculo.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AsignarVehiculoController } from './asignar-vehiculo.controller';

@Module({
  imports: [PrismaModule,AuthModule], 
  controllers: [AsignarVehiculoController],
  providers: [AsignarVehiculoService]
})
export class AsignarVehiculoModule {}
