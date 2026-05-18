import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVoluntarioDto } from './dto/create-voluntario.dto';
import { ActualizaVoluntarioDto } from './dto/actualizar-voluntario.dto';
import { deBajaVoluntarioDto } from './dto/daBaja-voluntario.dto';
//import { UpdateVoluntarioDto } from './dto/actualizar-voluntario.dto';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}
    //lo que retornamos(return) es lo mostramos en postmn
 /* crearVoluntario() {
    return this.prisma.voluntario.create({ // como VOLUNTARIO ES autoincrementable, no es necesario enviar un id, solo los datos que queremos guarda
      data: {},
    });
  }*/
 listarVoluntarios() { 
    return this.prisma.voluntario.findMany({
      include: {
        usuario: true,
      },
    });
  }
  /* si hay error al listar verificar aqui 
  listarPersonal(){
    return this.prisma.voluntario.findMany({
      where: {
        estado: {
          not: 'B',
        },
      },
      
    });
  }*/
 async listarPersonal() {
  try {
    return await this.prisma.voluntario.findMany({
      where: {
        estado: {
          not: 'B', // Trae todos los que NO están en estado 'B' (Baja)
        },
      },
      include: {
        // 1. Datos de cuenta
        usuario: {
          select: { email: true, estado: true }
        },
        // 2. ¿Es maquinista?
        maquinista: true,
        // 3. Turno actual (solo el activo 'A')
        turnosTrayecto: {
          where: { estado: 'A' },
          include: { 
            turno: {
              select: { nombre: true } // Solo el nombre para no sobrecargar
            } 
          }
        },
        // 4. Rol operativo actual (ej. Radio Operador, Rescatista)
        rolesTrayecto: {
          where: { estado: 'A' },
          include: { rol: true }
        },
        // 5. Grado o Cargo jerárquico
        cargosTrayecto: {
          where: { estado: 'A' },
          include: { cargo: true }
        }
      },
      orderBy: {
        apellido_paterno: 'asc' // Opcional: Listar alfabéticamente
      }
    });
  } catch (error) {
    console.error("Error al listar personal:", error);
    throw error;
  }

} 

  listarPersonalDeBaja() {
    return this.prisma.voluntario.findMany({
      where: {
        estado: 'B',
      },
    });
  }
crearVoluntario(dto: CreateVoluntarioDto) {
  return this.prisma.voluntario.create({
    data: {
      nombre:              dto.nombre,
      apellido_paterno:    dto.apellido_paterno,
      apellido_materno:    dto.apellido_materno,
      ci:                  dto.ci,
      telefono:            dto.telefono,
      telefono_emergencia: dto.telefono_emergencia,
      
      // Conversión explícita a Date para evitar errores de tipo DateTime
        fecha_nacimiento:    new Date(dto.fecha_nacimiento),
        
        sexo:                dto.sexo,
        direccion:           dto.direccion,
        correo_personal:     dto.correo_personal,
        observaciones:       dto.observaciones,
        id_modificacion: dto.id_modificacion
      },
  });
}


  

  async actualizarVoluntario( dto: ActualizaVoluntarioDto) {
    console.log("tenemos info--", dto);
    
  const voluntarioActualizado = await this.prisma.voluntario.update({
    where: { id_voluntario: dto.idUsuario },
    data: {
      nombre:              dto.datos.nombre,
      apellido_paterno:    dto.datos.apellido_paterno,
      apellido_materno:    dto.datos.apellido_materno,
      ci:                  dto.datos.ci,
      telefono:            dto.datos.telefono,
      telefono_emergencia: dto.datos.telefono_emergencia,
      fecha_nacimiento:    dto.datos.fecha_nacimiento ? new Date(dto.datos.fecha_nacimiento) : undefined,
      sexo:                dto.datos.sexo,
      direccion:           dto.datos.direccion,
      correo_personal:     dto.datos.correo_personal,
      observaciones:       dto.datos.observaciones,
      estado: dto.datos.estado,
      id_modificacion: dto.id_modificacion,
    },
  });

  // Retornamos un objeto con un mensaje y los datos nuevos
  return {
    message: 'Voluntario actualizado correctamente',
    status: 'success',
    data: voluntarioActualizado
  };
}
// de damos de baja pero creo q haria falta poner -->fecha de modificacion
async eliminar( dto: any) {
    console.log("tenemos eliminar--", dto);  
  const voluntarioActualizado = await this.prisma.voluntario.update({
    where: { id_voluntario: dto.id_voluntario },
    data: {
      nombre:              dto.nombre,
      apellido_paterno:    dto.apellido_paterno,
      apellido_materno:    dto.apellido_materno,
      ci:                  dto.ci,
      telefono:            dto.telefono,
      telefono_emergencia: dto.telefono_emergencia,
      fecha_nacimiento:    dto.fecha_nacimiento ? new Date(dto.fecha_nacimiento) : undefined,
      sexo:                dto.sexo,
      direccion:           dto.direccion,
      correo_personal:     dto.correo_personal,
      observaciones:       dto.observaciones,
      estado: 'B',
      id_modificacion: dto.id_modificacion,
    },
  });

  // Retornamos un objeto con un mensaje y los datos nuevos
  return {
    message: 'Voluntario eliminado correctamente',
    status: 'success',
    data: voluntarioActualizado
  };
}
async activar( dto: any) {
    console.log("tenemos eliminar--", dto);  
  const voluntarioActualizado = await this.prisma.voluntario.update({
    where: { id_voluntario: dto.id_voluntario },
    data: {
      nombre:              dto.nombre,
      apellido_paterno:    dto.apellido_paterno,
      apellido_materno:    dto.apellido_materno,
      ci:                  dto.ci,
      telefono:            dto.telefono,
      telefono_emergencia: dto.telefono_emergencia,
      fecha_nacimiento:    dto.fecha_nacimiento ? new Date(dto.fecha_nacimiento) : undefined,
      sexo:                dto.sexo,
      direccion:           dto.direccion,
      correo_personal:     dto.correo_personal,
      observaciones:       dto.observaciones,
      estado: 'A',
      id_modificacion: dto.id_modificacion,
    },
  });

  // Retornamos un objeto con un mensaje y los datos nuevos
  return {
    message: 'Voluntario eliminado correctamente',
    status: 'success',
    data: voluntarioActualizado
  };
}

//Rol
listarRol(){
  return this.prisma.rol.findMany(
    {
      where: {
      estado: 'A' 
    }
    }
  );
}
//
listarCargo(){
   return this.prisma.cargo.findMany({
      where: {
      estado: 'A' 
    }
    });
}

// agregar rol
async agregarRol(dato:any){
   console.log('Intentando agregar rol...',dato);

  try {
    return await this.prisma.rolTrayecto.create({
      data: {
        fecha: new Date(dato.fecha),
        id_rol: dato.id_rol,
        // Corregido: id_voluntario en lugar de d_voluntario
        d_voluntario: dato.d_voluntario,
        id_modificacion:dato.id_modificacion 
      }
    });
  } catch (error) {
    console.error("Error al crear el RolTrayecto:", error);
    throw error; // Re-lanzar para manejarlo en el servicio/controlador superior
  }
}
// agregar cargos
async agregarCargo(dato:any){
   console.log('Intentando agregar cargo...',dato);
  try {
    const cargoAsignado= await this.prisma.cargoTrayecto.create({
      data: {
        fecha: new Date(dato.fecha),
        id_cargo: Number(dato.id_cargo),
        d_voluntario: dato.d_voluntario,
         id_modificacion:dato.id_modificacion
      }
    });
      return {
      mensaje: "cargo asignado",
      data: cargoAsignado
    };
  } catch (error) {
    console.error("Error al crear el RolTrayecto:", error);
    throw error; // Re-lanzar para manejarlo en el servicio/controlador superior
  }
}
/// agregar horarios
//listar turnos
listarTurno(){
   return this.prisma.turno.findMany({
    where: {
      estado: 'A' 
    },
    orderBy: {
      id_turno: 'asc' 
    }
  });
}
  
}