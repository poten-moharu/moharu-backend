import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './activity.repository';
import { ActivityWishModule } from '../activity-wish/activity-wish.module';

@Module({
  imports: [ActivityWishModule],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
