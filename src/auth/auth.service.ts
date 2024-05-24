import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocialTypeEnum } from '../user/enum';
import { UserService } from '../user/user.service';
import { MailVerifyService } from '../common/mailer/mail-verify.service';
import { EmailCodeVerifyDto } from '../common/mailer/dto/email-verify.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailVerifyService: MailVerifyService,
  ) {}

  async validateSocialUser(createUserDto: CreateUserDto, socialType: SocialTypeEnum): Promise<any> {
    return await this.usersService.findBySocialIdAndSocialType(createUserDto.socialId, socialType);
  }
  async validateLocalUser(createUserDto: CreateUserDto) {
    return await this.usersService.validateLocalUser(createUserDto);
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async sendVerificationEmail(email: string) {
    await this.mailVerifyService.emailCodeSend(email);
  }
  async verifyEmailCode(emailCodeVerifyDto: EmailCodeVerifyDto) {
    return this.mailVerifyService.emailCodeVerify(emailCodeVerifyDto);
  }
}
