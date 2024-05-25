import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { MailVerifyService } from 'src/common/mailer/mail-verify.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { ActivityWishModule } from 'src/activity-wish/activity-wish.module';
import { ActivityCategoryModule } from 'src/activity-category/activity-category.module';

@Module({
  imports: [MailerModule, PassportModule, forwardRef(() => AuthModule), ActivityWishModule, ActivityCategoryModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, MailVerifyService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
