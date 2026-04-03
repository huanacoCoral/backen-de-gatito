export class CrearCargoDto{
    id_turno: number;
    id_voluntario: number;
    fechaInicio: string;
    fechaFin:string;
    dia:string;

}
/*model TurnoTrayecto {
  id_turnoTrayecto Int @id @default(autoincrement())
  fechaInicio      DateTime?
  fechaFin         DateTime?
  dia              String?
  id_turno         Int
  d_voluntario     Int

  turno      Turno      @relation(fields: [id_turno], references: [id_turno])
  voluntario Voluntario @relation(fields: [d_voluntario], references: [id_voluntario])
} */