import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearCargoDto } from './dto/create-cargo.dto';
import { AsignarCargoDto } from './dto/asignar-cargo.dto';
import { ListarCargosDto } from './dto/listar-cargo.dto';

@Injectable()
export class CargoService {
    constructor(private prisma: PrismaService) {}
    
      crear(dto: CrearCargoDto) {
        return this.prisma.cargo.create({
          data: {
            nombre:dto.nombre,
            id_modificacion:dto.id_modificacion
          },
        });
      }
    
      listar() {
        return this.prisma.cargo.findMany({
          where:{
            estado:'A'
          }
        });
      }
      editarCargo(dto:any){
        return this.prisma.cargo.update({
          where:{
            id_cargo:dto.id_cargo
          },
          data: {
            nombre:dto.nombre,
            id_modificacion:dto.id_modificacion
          },
        });
      }
      eliminarCargo(dto:any){
        return this.prisma.cargo.update({
          where:{
            id_cargo:dto.id_cargo
          },
          data: {
            estado:'I'
          },
        });
      }
      //asignarCargo
      asignarCargo(dto:AsignarCargoDto)
      {
        return this.prisma.cargoTrayecto.create({
            data: {
            id_cargo: dto.id_cargo,
            d_voluntario: dto.id_voluntario,
            fecha: new Date(dto.fecha) // Convertimos el string a un objeto Date de JS
            }
        });
      }
      historialCargos(dto: ListarCargosDto) {
       // console.log("lalalalaaa",id_voluntario);
        
      return this.prisma.cargoTrayecto.findMany({
        where: {
           d_voluntario: dto.id_voluntario
          },
        include: { 
          cargo: true 
        }
      });
}
}
