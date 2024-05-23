import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from './mailer.service';
import { EmailVerificationRepository } from './emailVerification.repository';
import { EmailCodeVerifyDto } from './dto/email-verify.dto';

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

  async emailCodeVerify(dto: EmailCodeVerifyDto) {
    const emailCodeData = await this.emailVerificationRepository.findOneBy({ email: dto.email });

    if (!emailCodeData) {
      throw new BadRequestException('잘못된 요청입니다.');
    }

    if (dto.code !== emailCodeData.verificationCode) {
      throw new BadRequestException('잘못된 인증 코드입니다.');
    }

    const currentTime = new Date();
    if (currentTime > emailCodeData.expiresAt) {
      throw new BadRequestException('인증 코드가 만료되었습니다.');
    }

    emailCodeData.isVerified = true;
    return await this.emailVerificationRepository.save(emailCodeData);
  }
}
