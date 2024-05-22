import { Injectable } from '@nestjs/common';
import { ActivityCategory } from './entity/activity-category.entity';
import { ActivityCategoryRepository } from './activity-category.repository';

@Injectable()
export class ActivityCategoryService {
  constructor(
    private readonly activityCategoryRepository: ActivityCategoryRepository,
  ) {}

  findAll(): Promise<ActivityCategory[]> {
    return this.activityCategoryRepository.find();
  }
}
