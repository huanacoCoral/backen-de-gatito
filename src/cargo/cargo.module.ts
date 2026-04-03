import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { CargoService } from './cargo.service';

@Module({
  imports: [PrismaModule,AuthModule],
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {
  
}
