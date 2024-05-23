import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from './mailer.service';
import { EmailVerificationRepository } from './emailVerification.repository';

@Injectable()
export class MailVerifyService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(EmailVerificationRepository) private emailVerificationRepository: EmailVerificationRepository,
  ) {}

  async emailCodeSend(email: string) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 3 * 60 * 1000);
    const verificationCode = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    const emailCode = this.emailVerificationRepository.create({
      email,
      verificationCode,
      expiresAt,
    });
    const subject = '모하루 이메일 인증';
    const content = `${verificationCode}`;

    await this.mailerService.sendMail(email, subject, content);
    await this.emailVerificationRepository.save(emailCode);
  }
}
