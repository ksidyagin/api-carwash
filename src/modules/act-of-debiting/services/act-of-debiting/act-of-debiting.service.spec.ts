import { Test, TestingModule } from '@nestjs/testing';
import { ActOfDebitingService } from './act-of-debiting.service';

describe('ActOfDebitingService', () => {
  let service: ActOfDebitingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActOfDebitingService],
    }).compile();

    service = module.get<ActOfDebitingService>(ActOfDebitingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
