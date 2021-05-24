import { Test, TestingModule } from '@nestjs/testing';
import { UserToCarwashService } from './user-to-carwash.service';

describe('UserToCarwashService', () => {
  let service: UserToCarwashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToCarwashService],
    }).compile();

    service = module.get<UserToCarwashService>(UserToCarwashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
