import { Test, TestingModule } from '@nestjs/testing';
import { ActivityWishService } from './activity-wish.service';

describe('ActivityWishService', () => {
  let service: ActivityWishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityWishService],
    }).compile();

    service = module.get<ActivityWishService>(ActivityWishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
