import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private prisma: PrismaService) {}

  crear(nombre: string) {
    return this.prisma.rol.create({
      data: { nombre },
    });
  }

  listar() {
    return this.prisma.rol.findMany();
  }
}