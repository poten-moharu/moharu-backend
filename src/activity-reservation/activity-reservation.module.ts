import { Module } from '@nestjs/common';
import { ActivityReservationController } from './activity-reservation.controller';
import { ActivityReservationService } from './activity-reservation.service';
import { ActivityCategoryRepository } from 'src/activity-category/activity-category.repository';
import { ActivityReservationRepository } from './activity-reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityReservationRepository])],
  controllers: [ActivityReservationController],
  providers: [ActivityReservationService, ActivityCategoryRepository],
  exports: [ActivityReservationService],
})
export class ActivityReservationModule {}
