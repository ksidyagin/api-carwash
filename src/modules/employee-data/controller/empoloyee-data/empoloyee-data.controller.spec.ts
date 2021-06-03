import { Test, TestingModule } from '@nestjs/testing';
import { EmpoloyeeDataController } from './empoloyee-data.controller';

describe('EmpoloyeeDataController', () => {
  let controller: EmpoloyeeDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpoloyeeDataController],
    }).compile();

    controller = module.get<EmpoloyeeDataController>(EmpoloyeeDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
