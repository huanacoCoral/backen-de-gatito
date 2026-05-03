export class CreateInformeMaterialDto {
    tipo: string;
    estado: string;
    marca: string;
    modelo: string;
    numSerie: string;
    fechaAdquisicion: string;
    capacidad: string;
    caracteristicas: string;
    historial: string;
    responsableEquipo: string;
    cantidad: number;
    cantidadUnidad: number;
    unidadMedida: string;
    fechaLimiteUso: string;
    intervaloTiempoRevision: string;
    id_voluntario: number; 
    id_loteMaterial:number;
    id_modificacion?:number;
}