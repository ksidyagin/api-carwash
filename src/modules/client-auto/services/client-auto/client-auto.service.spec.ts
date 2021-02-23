import { Test, TestingModule } from '@nestjs/testing';
import { ClientAutoService } from './client-auto.service';

describe('ClientAutoService', () => {
  let service: ClientAutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAutoService],
    }).compile();

    service = module.get<ClientAutoService>(ClientAutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
