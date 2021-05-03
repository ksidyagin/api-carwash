import { Test, TestingModule } from '@nestjs/testing';
import { InternalDisplacementController } from './internal-displacement.controller';

describe('InternalDisplacementController', () => {
  let controller: InternalDisplacementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalDisplacementController],
    }).compile();

    controller = module.get<InternalDisplacementController>(InternalDisplacementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
