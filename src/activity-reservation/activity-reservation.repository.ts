import { DataSource, Repository } from 'typeorm';
import { ActivityReservation } from './entity/activity-reservation.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityReservationRepository extends Repository<ActivityReservation> {
  constructor(private dataSource: DataSource) {
    super(ActivityReservation, dataSource.createEntityManager());
  }
}
