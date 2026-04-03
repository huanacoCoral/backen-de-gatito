import { Module } from '@nestjs/common';
import { MaquinistaService } from './maquinista.service';
import { MaquinistaController } from './maquinista.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule,AuthModule],
  providers: [MaquinistaService],
  controllers: [MaquinistaController]
})
export class MaquinistaModule {}
