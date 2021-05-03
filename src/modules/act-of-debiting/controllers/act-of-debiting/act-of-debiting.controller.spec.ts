import { Test, TestingModule } from '@nestjs/testing';
import { ActOfDebitingController } from './act-of-debiting.controller';

describe('ActOfDebitingController', () => {
  let controller: ActOfDebitingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActOfDebitingController],
    }).compile();

    controller = module.get<ActOfDebitingController>(ActOfDebitingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
