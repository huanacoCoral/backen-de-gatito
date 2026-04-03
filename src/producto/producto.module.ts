import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';

@Module({
    imports: [PrismaModule,AuthModule],
      controllers: [ProductoController],
      providers: [ProductoService],
})
export class ProductoModule {}
