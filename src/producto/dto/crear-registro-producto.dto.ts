export class CreateRegistroProductoDto {
  destino: string;
  unidad: string;
  cantidad: number;
  id_emergencia: number;
  id_modificacion:number;
  lotes: {
    id_loteProducto: number;
    cantidad: number;
  }[];
}