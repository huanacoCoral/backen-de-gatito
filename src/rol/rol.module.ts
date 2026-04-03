import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // 👈 ESTO SOLUCIONA TODO
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
