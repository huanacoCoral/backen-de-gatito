import { Test, TestingModule } from '@nestjs/testing';
import { AsignarVehiculoController } from './asignar-vehiculo.controller';

describe('AsignarVehiculoController', () => {
  let controller: AsignarVehiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignarVehiculoController],
    }).compile();

    controller = module.get<AsignarVehiculoController>(AsignarVehiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
