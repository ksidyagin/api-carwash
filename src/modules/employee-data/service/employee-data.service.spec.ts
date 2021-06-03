import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDataService } from './employee-data.service';

describe('EmployeeDataService', () => {
  let service: EmployeeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDataService],
    }).compile();

    service = module.get<EmployeeDataService>(EmployeeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
