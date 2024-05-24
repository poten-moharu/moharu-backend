import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SocialTypeEnum } from '../user/enum';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAuthResponseDto } from './dto/create-auth-response.dto';
import { EmailCodeVerifyDto } from '../common/mailer/dto/email-verify.dto';
import { EmailVerification } from '../common/mailer/entity/email-verifications.entity';

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
  @Post(':socialType/login')
  async socialLogin(
    @Param('socialType') socialType: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateAuthResponseDto> {
    const socialTypeEnum = this.mapStringToSocialTypeEnum(socialType);
    let user = await this.authService.validateSocialUser(createUserDto, socialTypeEnum);

    if (!user) {
      user = await this.usersService.createUserFromSocialData(createUserDto, socialTypeEnum);
    }
    const accessToken = await this.authService.login(user);
    return { accessToken, user };
  }

  @ApiOperation({ summary: '로컬 로그인' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '유저 생성 및 토큰 반환', type: CreateAuthResponseDto })
  @ApiResponse({ status: 401, description: '잘못된 이메일 또는 비밀번호' })
  @Post('local/login')
  async localLogin(@Body() createUserDto: CreateUserDto): Promise<CreateAuthResponseDto> {
    const user = await this.authService.validateLocalUser(createUserDto);
    const accessToken = await this.authService.login(user);
    return { accessToken, user };
  }

  @Post('register')
  @ApiOperation({ summary: '회원 가입' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '회원 가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<CreateAuthResponseDto> {
    const newUser = await this.usersService.createUserFromLocal(createUserDto);
    return { accessToken: await this.authService.login(newUser), user: newUser };
  }

  @Post('send-verify-email')
  @ApiOperation({ summary: '인증 이메일 전송' })
  @ApiBody({ type: String, description: '사용자의 이메일 주소' })
  @ApiResponse({ status: 200, description: '이메일 전송 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async sendEmail(email: string): Promise<void> {
    await this.authService.sendVerificationEmail(email);
  }

  @Post('verify-email')
  @ApiOperation({ summary: '이메일 인증' })
  @ApiBody({ type: EmailCodeVerifyDto, description: '이메일 인증 코드' })
  @ApiResponse({ status: 200, description: '이메일 인증 성공', type: EmailVerification })
  @ApiResponse({ status: 400, description: '잘못된 요청 또는 인증 실패' })
  async verifyUserEmail(@Body() emailCodeVerifyDto: EmailCodeVerifyDto): Promise<void> {
    const isValid = await this.authService.verifyEmailCode(emailCodeVerifyDto);
    if (!isValid) {
      throw new BadRequestException('코드가 정확하지 않거나 인증시간이 만료되었습니다.');
    }
  }

  @Get('check-email')
  @ApiOperation({ summary: '이메일 존재 여부 확인' })
  @ApiQuery({ name: 'email', required: true, description: '확인할 이메일 주소' })
  @ApiResponse({ status: 200, description: '이메일 존재 여부 반환' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async checkEmailExists(@Query('email') email: string): Promise<{ exists: boolean }> {
    const user = await this.usersService.findByEmailAndSocialType(email, SocialTypeEnum.LOCAL);
    return { exists: !!user };
  }
}
