import { Module } from '@nestjs/common';
import { ActivityWishController } from './activity-wish.controller';
import { ActivityWishService } from './activity-wish.service';
import { ActivityWishRepository } from './activity-wish.repository';

@Module({
  controllers: [ActivityWishController],
  providers: [ActivityWishService, ActivityWishRepository],
  exports: [ActivityWishService, ActivityWishRepository],
})
export class ActivityWishModule {}
