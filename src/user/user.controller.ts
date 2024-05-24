import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User as GetCurrentUser } from './utils/user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('jwt')
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard())
  async authMe(@GetCurrentUser() user: User) {
    console.log('🚀  id:', user.id);
    return `id: ${user.id}`;
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
}
