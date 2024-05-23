import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailCodeSendDto } from '../common/mailer/dto/email-code.dto';
import { EmailCodeVerifyDto } from '../common/mailer/dto/email-verify.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: '모든 사용자의 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 모든 사용자를 반환했습니다.',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '사용자 조회',
    description: 'ID를 사용하여 특정 사용자를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자를 반환했습니다.',
    type: User,
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: '새 사용자 생성', description: '새로운 사용자를 생성합니다.' })
  @ApiResponse({ status: 201, description: '성공적으로 사용자가 생성되었습니다.', type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.profileImage = createUserDto.profileImage;
    return this.userService.create(user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '사용자 삭제',
    description: 'ID를 사용하여 특정 사용자를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 사용자가 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(Number(id));
  }

  @Post('email')
  emailCodeSend(@Body() emailCodeSendDto: EmailCodeSendDto) {
    return this.userService.emailCodeSend(emailCodeSendDto);
  }

  @Post('email/verify')
  emailCodeVerify(@Body() emailCodeVerifyDto: EmailCodeVerifyDto) {
    return this.userService.emailCodeVerify(emailCodeVerifyDto);
  }
}
