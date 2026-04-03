import { Module } from '@nestjs/common';
import { GravedadController } from './gravedad.controller';
import { GravedadService } from './gravedad.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [GravedadController],
  providers: [GravedadService]
})
export class GravedadModule {}
