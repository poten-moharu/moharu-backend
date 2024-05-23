import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocialTypeEnum } from '../user/enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(socialId: string, socialType: SocialTypeEnum): Promise<any> {
    return await this.usersService.findBySocialIdAndSocialType(socialId, socialType);
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
