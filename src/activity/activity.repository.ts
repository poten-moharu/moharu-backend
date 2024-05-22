import { DataSource, Repository } from 'typeorm';
import { Activity } from './entity/activity.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(private dataSource: DataSource) {
    super(Activity, dataSource.createEntityManager());
  }
}
