import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';

@Module({
    
      imports: [PrismaModule,AuthModule], // 👈 OBLIGATORIO
      controllers: [VehiculosController],
      providers: [VehiculosService],
})
export class VehiculosModule {}
