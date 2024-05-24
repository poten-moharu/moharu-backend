import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User as GetCurrentUser } from './utils/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  async getUserProfile(@GetCurrentUser() user: User) {
    return this.userService.getUserProfile(user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '사용자 삭제', description: 'ID를 사용하여 특정 사용자를 삭제합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 사용자가 삭제되었습니다.' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없습니다.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @ApiOperation({ summary: '사용자 정보 업데이트', description: '사용자의 정보를 업데이트합니다.' })
  @ApiResponse({ status: 200, description: '성공적으로 사용자가 업데이트되었습니다.', type: User })
  @ApiBearerAuth('accessToken')
  update(@GetCurrentUser() user: User, @Body() createUserDto: CreateUserDto): Promise<User> {
    Object.assign(user, createUserDto);
    return this.userService.update(user);
  }
}
