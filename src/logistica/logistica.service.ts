import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogisticaService {


  constructor(
    private prisma: PrismaService,
  ) {}
  async emergenciasPorMes(anio: any) {
console.log("*****/");

    const datos: any[] = await this.prisma.$queryRaw`

      SELECT

        EXTRACT(MONTH FROM fecha)::int AS mes,

        COUNT(*)::int AS total

      FROM "Emergencia"

      WHERE
        EXTRACT(YEAR FROM fecha) = ${anio}
        AND estado = 'A'

      GROUP BY mes

      ORDER BY mes ASC

    `;

    // =====================================
    // COMPLETAR MESES VACIOS
    // =====================================

    const meses = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    const resultado = meses.map((nombre, index) => {

      const encontrado = datos.find(
        item => item.mes === index + 1,
      );

      return {
        mes: nombre,
        total: encontrado ? Number(encontrado.total) : 0,
      };
    });

    return resultado;
  }
 async tiposEmergencia() {

  const datos = await this.prisma.emer_tiene_TipoEmer.groupBy({

    by:['id_tipoEmergencia'],

    _count:{
      id_tipoEmergencia:true,
    },
  });

  const resultado: {
    nombre:string | undefined;
    total:number;
  }[] = [];

  for(const item of datos){

    const tipo = await this.prisma.tipoEmergencia.findUnique({

      where:{
        id_tipoEmergencia:item.id_tipoEmergencia,
      },
    });

    resultado.push({

      nombre: tipo?.nombre,

      total: item._count.id_tipoEmergencia,
    });
  }

  return resultado;
}
// dashboard.service.ts

async vehiculosMasUsados() {

  const datos = await this.prisma.vehi_participo_emer.groupBy({

    by:['id_vehiculo'],

    _count:{
      id_vehiculo:true,
    },

    orderBy:{
      _count:{
        id_vehiculo:'desc',
      },
    },
  });

  const resultado:{
    nombre:string;
    total:number;
  }[] = [];

  for(const item of datos){

    const vehiculo = await this.prisma.vehiculo.findUnique({

      where:{
        id_vehiculo:item.id_vehiculo,
      },

      include:{
        ingreso:true,
      },
    });

    resultado.push({

      nombre:
        vehiculo?.ingreso?.nombre || 'Vehículo',

      total:
        item._count.id_vehiculo,
    });
  }

  return resultado;
}
}
