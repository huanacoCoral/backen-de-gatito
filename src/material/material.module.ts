import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { MaterialController } from './material.controller';

@Module({
  imports: [PrismaModule,AuthModule], // 👈 OBLIGATORIO
  controllers: [MaterialController],
  providers: [MaterialService]
})
export class MaterialModule {}
