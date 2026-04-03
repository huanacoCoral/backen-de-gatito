import { Test, TestingModule } from '@nestjs/testing';
import { GravedadService } from './gravedad.service';

describe('GravedadService', () => {
  let service: GravedadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GravedadService],
    }).compile();

    service = module.get<GravedadService>(GravedadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
