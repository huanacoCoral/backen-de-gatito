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
  listarPersonal(){
    return this.prisma.voluntario.findMany({
      where: {
        estado: {
          not: 'DE-BAJA',
        },
      },
    });
  }
  listarPersonalDeBaja() {
    return this.prisma.voluntario.findMany({
      where: {
        estado: 'DE-BAJA',
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
      estado: dto.datos.estado
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
      estado: 'DE-BAJA'
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
  return this.prisma.rol.findMany();
}
//
listarCargo(){
   return this.prisma.cargo.findMany();
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
        d_voluntario: dato.d_voluntario 
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
    return await this.prisma.cargoTrayecto.create({
      data: {
        fecha: new Date(dato.fecha),
        id_cargo: dato.id_cargo,
        d_voluntario: dato.d_voluntario 
      }
    });
  } catch (error) {
    console.error("Error al crear el RolTrayecto:", error);
    throw error; // Re-lanzar para manejarlo en el servicio/controlador superior
  }
}
/// agregar horarios
//listar turnos
listarTurno(){
   return this.prisma.turno.findMany();
}
  
}