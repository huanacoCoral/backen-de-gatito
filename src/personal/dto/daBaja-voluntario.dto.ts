export class deBajaVoluntarioDto {

    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    ci: string;
    telefono: string;
    telefono_emergencia: string;
    fecha_nacimiento: string | Date;
    sexo: string;
    direccion: string;
    correo_personal: string;
    estado: 'ACTIVO' | 'INACTIVO'| 'DE-BAJA'| 'otro'; // Ejemplo de unión de tipos
    observaciones: string;
    id_voluntario: number;
}