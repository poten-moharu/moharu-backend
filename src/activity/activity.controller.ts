import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Activity } from './entity/activity.entity';
import { OptionalAuthGuard } from '../auth/guards/jwt-optional-auth.guard';
import { OptionalUser, User } from '../user/utils/user.decorator';
import { User as UserEntity } from '../user/entity/user.entity';
import { ActivityWishService } from '../activity-wish/activity-wish.service';
import { ActivityResponseDto } from './dto/activity-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly activityWishService: ActivityWishService,
  ) {}

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth() // JWT 인증 헤더 추가
  @ApiOperation({
    summary: '모든 활동 조회',
    description: '인증이 선택적입니다. 인증된 사용자는 추가 정보를 받을 수 있습니다.',
  })
  @ApiQuery({ name: 'categoryId', required: false, description: '카테고리 ID' })
  @ApiQuery({ name: 'selectedDate', required: false, description: '선택된 날짜' })
  @ApiResponse({
    status: 200,
    description: '모든 활동을 반환합니다.',
    type: ActivityResponseDto,
  })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('selectedDate') selectedDate?: string,
    @OptionalUser() user?: UserEntity,
  ) {
    const activities = await this.activityService.findAll(categoryId, selectedDate);
    let wishedActivityIds: number[] = [];

    if (user) {
      wishedActivityIds = await this.activityWishService.findAllWishesByUserIdReturnedNums(user.id);
    }
    return {
      activities,
      wishedActivityIds,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 활동 조회' })
  @ApiResponse({
    status: 200,
    description: '주어진 ID를 가진 활동을 반환합니다.',
    type: Activity,
  })
  @ApiResponse({ status: 404, description: '활동을 찾을 수 없습니다.' })
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }
  @Get('wish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '사용자의 모든 좋아요 조회',
    description: '특정 사용자의 모든 좋아요 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요 목록을 성공적으로 반환했습니다.',
    type: [Activity],
  })
  findAllWishesByUserId(@User() user: UserEntity): Promise<Activity[]> {
    return this.activityService.findAllWishedActivitiesByUserId(user.id);
  }
}
