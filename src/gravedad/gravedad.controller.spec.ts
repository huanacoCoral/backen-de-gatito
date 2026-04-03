import { Test, TestingModule } from '@nestjs/testing';
import { GravedadController } from './gravedad.controller';

describe('GravedadController', () => {
  let controller: GravedadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GravedadController],
    }).compile();

    controller = module.get<GravedadController>(GravedadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
