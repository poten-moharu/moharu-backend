import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OptionalAuthGuard } from '../auth/guards/jwt-optional-auth.guard';
import { OptionalUser, User } from '../user/utils/user.decorator';
import { User as UserEntity } from '../user/entity/user.entity';
import { ActivityWishService } from '../activity-wish/activity-wish.service';
import { ActivityResponseDto } from './dto/activity-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityDetailResponseDto } from './dto/activity-detail-response.dto';
import { ActivityWishlistResponseDto } from './dto/activity-wishlist-response.dto';

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
  @ApiResponse({ status: 200, description: '활동 상세 정보를 반환합니다.', type: ActivityDetailResponseDto })
  @ApiResponse({ status: 404, description: '활동을 찾을 수 없습니다.' })
  @UseGuards(OptionalAuthGuard)
  async findOne(@OptionalUser() user?: UserEntity, @Param('id') id?: string): Promise<ActivityDetailResponseDto> {
    return this.activityService.findOne(user, +id);
  }
  @Get('wish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'type', required: false, description: '타입(meeting,event,..)' })
  @ApiOperation({
    summary: '사용자의 모든 좋아요 조회',
    description: '특정 사용자의 모든 좋아요 목록을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요 목록을 성공적으로 반환했습니다.',
    type: ActivityWishlistResponseDto,
  })
  findAllWishesByUserId(@User() user: UserEntity, @Query('type') type?: string): Promise<ActivityWishlistResponseDto> {
    return this.activityService.findAllWishedActivitiesByUserId(user.id, type);
  }
}
