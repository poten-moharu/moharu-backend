import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendMail(to: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to,
      from: process.env.GMAIL_MAIL_USER,
      subject,
      text,
    });
  }
}
