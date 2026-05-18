import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private prisma: PrismaService) {}

  crear(dto: any) {
    return this.prisma.rol.create({
      data: { 
        nombre:dto.nombre,
         id_modificacion: dto.id_modificacion
       },
    });
  }
  async editar(data: any) {
  return await this.prisma.rol.update({
    where: {
      id_rol: data.idRol
    },
    data: {
      nombre: data.nombre,
      id_modificacion: data.id_modificacion,
      estado:data.estado
    }
  });
}

  listar() {
    return this.prisma.rol.findMany({
      where:{
        estado:'A'
      }
    });
  }
  async editarRol(data: any) {

  // verificar existencia
  const existe = await this.prisma.rol.findUnique({

    where:{
      id_rol:data.id_rol,
    },
  });

  if(!existe){

    throw new BadRequestException(
      'El rol no existe'
    );
  }

  // actualizar
  const rolActualizado = await this.prisma.rol.update({

    where:{
      id_rol:data.id_rol,
    },

    data:{

      nombre:data.nombre,

      estado:data.estado,

      id_modificacion:data.id_modificacion,
    },
  });

  return rolActualizado;
}
}