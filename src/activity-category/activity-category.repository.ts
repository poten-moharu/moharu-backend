import { DataSource, Repository } from 'typeorm';
import { ActivityCategory } from './entity/activity-category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityCategoryRepository extends Repository<ActivityCategory> {
  constructor(private dataSource: DataSource) {
    super(ActivityCategory, dataSource.createEntityManager());
  }
}
