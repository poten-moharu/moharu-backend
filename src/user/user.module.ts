import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MailerModule } from 'src/common/mailer/mailer.module';
import { MailVerifyService } from 'src/common/mailer/mail-verify.service';

@Module({
  imports: [MailerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, MailVerifyService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
