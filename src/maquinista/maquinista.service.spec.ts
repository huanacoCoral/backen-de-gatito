import { Test, TestingModule } from '@nestjs/testing';
import { MaquinistaService } from './maquinista.service';

describe('MaquinistaService', () => {
  let service: MaquinistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaquinistaService],
    }).compile();

    service = module.get<MaquinistaService>(MaquinistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
