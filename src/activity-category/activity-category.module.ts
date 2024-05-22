import { Module } from '@nestjs/common';
import { ActivityCategoryController } from './activity-category.controller';
import { ActivityCategoryService } from './activity-category.service';
import { ActivityCategoryRepository } from './activity-category.repository';

@Module({
  controllers: [ActivityCategoryController],
  providers: [ActivityCategoryService, ActivityCategoryRepository],
  exports: [ActivityCategoryService, ActivityCategoryRepository],
})
export class ActivityCategoryModule {}
