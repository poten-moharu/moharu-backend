import { Test, TestingModule } from '@nestjs/testing';
import { ActivityCategoryController } from './activity-category.controller';

describe('ActivityCategoryController', () => {
  let controller: ActivityCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityCategoryController],
    }).compile();

    controller = module.get<ActivityCategoryController>(
      ActivityCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
