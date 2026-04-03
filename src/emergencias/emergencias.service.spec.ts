import { Test, TestingModule } from '@nestjs/testing';
import { EmergenciasService } from './emergencias.service';

describe('EmergenciasService', () => {
  let service: EmergenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergenciasService],
    }).compile();

    service = module.get<EmergenciasService>(EmergenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
