import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmergenciasController } from './emergencias.controller';
import { EmergenciasService } from './emergencias.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [PrismaModule,AuthModule], // 👈 OBLIGATORIO
  controllers: [EmergenciasController],
  providers: [EmergenciasService],
})
export class EmergenciasModule {}
