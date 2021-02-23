import { Test, TestingModule } from '@nestjs/testing';
import { ClientAutoController } from './client-auto.controller';

describe('ClientAutoController', () => {
  let controller: ClientAutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientAutoController],
    }).compile();

    controller = module.get<ClientAutoController>(ClientAutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
