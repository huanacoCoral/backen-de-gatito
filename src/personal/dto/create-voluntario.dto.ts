export class CreateVoluntarioDto {
 // id_voluntario Int @id @default(autoincrement())

  nombre:             string;
  apellido_paterno:   string;
  apellido_materno:   string;
  ci:                 string;   
  telefono:           string;
  telefono_emergencia:  string;
  fecha_nacimiento:   Date;
  sexo:               string;

  direccion:          string;
  correo_personal:    string;

  //fecha_ingreso      DateTime  @default(now())
  //estado:              string;   @default("ACTIVO")

  observaciones:      string;
  
}