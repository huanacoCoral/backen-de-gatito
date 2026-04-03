import { Test, TestingModule } from '@nestjs/testing';
import { AsignarVehiculoService } from './asignar-vehiculo.service';

describe('AsignarVehiculoService', () => {
  let service: AsignarVehiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsignarVehiculoService],
    }).compile();

    service = module.get<AsignarVehiculoService>(AsignarVehiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
