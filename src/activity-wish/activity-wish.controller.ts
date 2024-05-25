import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ActivityWishService } from './activity-wish.service';
import { ActivityWish } from './entity/activity-wish.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateActivityWishDto } from './dto/create-activity-wish.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/utils/user.decorator';
import { User as UserEntity } from '../user/entity/user.entity';
@ApiTags('activity-wishes')
@Controller('activity-wishes')
export class ActivityWishController {
  constructor(private readonly activityWishService: ActivityWishService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '액티비티 좋아요 추가',
    description: '사용자가 특정 액티비티에 대한 좋아요를 추가',
  })
  @ApiResponse({
    status: 201,
    description: '좋아요 추가',
    type: ActivityWish,
  })
  addWish(@User() user: UserEntity, @Body() createActivityWishDto: CreateActivityWishDto): Promise<ActivityWish> {
    return this.activityWishService.addWish(user.id, createActivityWishDto.activitiesId);
  }

  @Delete(':activitiesId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '액티비티 좋아요 취소',
    description: '사용자가 특정 액티비티에 대한 좋아요를 취소합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요가 성공적으로 취소되었습니다.',
  })
  removeWish(@User() user: UserEntity, @Param('activitiesId') activitiesId: string): Promise<void> {
    return this.activityWishService.removeWish(user.id, Number(activitiesId));
  }
}
