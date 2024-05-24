import { Test, TestingModule } from '@nestjs/testing';
import { ActivityWishController } from './activity-wish.controller';

describe('ActivityWishController', () => {
  let controller: ActivityWishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityWishController],
    }).compile();

    controller = module.get<ActivityWishController>(ActivityWishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
