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
          },
        });
      }
    
      listar() {
        return this.prisma.cargo.findMany();
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
