import { Test, TestingModule } from '@nestjs/testing';
import { MaquinistaController } from './maquinista.controller';

describe('MaquinistaController', () => {
  let controller: MaquinistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaquinistaController],
    }).compile();

    controller = module.get<MaquinistaController>(MaquinistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
