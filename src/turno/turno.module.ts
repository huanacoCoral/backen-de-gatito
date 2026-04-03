import { Module } from '@nestjs/common';
import { TurnoController } from './turno.controller';
import { TurnoService } from './turno.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
   imports: [PrismaModule,AuthModule],
  controllers: [TurnoController],
  providers: [TurnoService]
})
export class TurnoModule {}
