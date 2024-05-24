import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMDevConfig } from './configs/typeorm.config';
import { ActivityModule } from './activity/activity.module';
import { ActivityCategoryModule } from './activity-category/activity-category.module';
import { ActivityWishModule } from './activity-wish/activity-wish.module';
import { MailerModule } from './common/mailer/mailer.module';
import { AuthModule } from './auth/auth.module';
import { ActivityReservationModule } from './activity-reservation/activity-reservation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMDevConfig),
    UserModule,
    ActivityModule,
    ActivityCategoryModule,
    ActivityWishModule,
    AuthModule,
    MailerModule,
    ActivityReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
