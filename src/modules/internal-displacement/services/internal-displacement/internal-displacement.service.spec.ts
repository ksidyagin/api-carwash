import { Test, TestingModule } from '@nestjs/testing';
import { InternalDisplacementService } from './internal-displacement.service';

describe('InternalDisplacementService', () => {
  let service: InternalDisplacementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalDisplacementService],
    }).compile();

    service = module.get<InternalDisplacementService>(InternalDisplacementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
