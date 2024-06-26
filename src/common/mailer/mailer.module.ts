import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { MailVerifyService } from './mail-verify.service';
import { EmailVerificationRepository } from './emailVerification.repository';
import 'dotenv/config';

@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_MAIL_USER,
          pass: process.env.GMAIL_MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"모하루" <moharu.team@gmail.com>',
      },
    }),
  ],
  providers: [MailerService, MailVerifyService, EmailVerificationRepository],
  exports: [MailerService, MailVerifyService, EmailVerificationRepository],
})
export class MailerModule {}
