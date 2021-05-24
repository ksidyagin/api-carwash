import { Test, TestingModule } from '@nestjs/testing';
import { UserToCarwashController } from './user-to-carwash.controller';

describe('UserToCarwashController', () => {
  let controller: UserToCarwashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToCarwashController],
    }).compile();

    controller = module.get<UserToCarwashController>(UserToCarwashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
