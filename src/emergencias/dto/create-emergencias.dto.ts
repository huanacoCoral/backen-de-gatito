export class CreateEmergenciaDto {

  fecha: string;
  hora: string;
  direccion: string;
  cel_ref: string;
  nombrePersona: string;
  tipoRecepcion: string;

  // Relaciones obligatorias
  id_gravedad: number;
  id_voluntario: number;

   
}
export class ActualizarEmergenciaDto {

  fecha: string;
  hora: string;
  direccion: string;
  cel_ref: string;
  nombrePersona: string;
  tipoRecepcion: string;

  // Relaciones obligatorias
  id_gravedad: number;
  id_voluntario: number;

  // Campos de auditoría (los que preguntaste)
  estado: string;             //por defecto A
  id_modificacion: number;    
}