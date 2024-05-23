import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SocialTypeEnum } from '../user/enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAuthResponseDto } from './dto/create-auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  private mapStringToSocialTypeEnum(socialType: string): SocialTypeEnum {
    const enumValue = SocialTypeEnum[socialType.toUpperCase()];
    if (!enumValue) {
      throw new BadRequestException(`Invalid social type: ${socialType}`);
    }
    return enumValue;
  }

  @ApiOperation({ summary: '소셜 로그인' })
  @ApiParam({ name: 'socialType', required: true, description: '소셜 로그인 타입', enum: SocialTypeEnum })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '유저 생성 및 토큰 반환', type: CreateAuthResponseDto })
  @ApiResponse({ status: 400, description: '잘못된 소셜 타입' })
  @Post(':socialType')
  async socialLogin(
    @Param('socialType') socialType: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateAuthResponseDto> {
    const socialTypeEnum = this.mapStringToSocialTypeEnum(socialType);
    const user = await this.authService.validateUser(createUserDto.socialId, socialTypeEnum);

    let accessToken: string;
    if (!user) {
      const newUser = await this.usersService.createUserFromSocialData(createUserDto, socialTypeEnum);
      accessToken = await this.authService.login(newUser);
      return { accessToken, user: newUser };
    } else {
      accessToken = await this.authService.login(user);
      return { accessToken, user };
    }
  }
}
