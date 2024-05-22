import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActivityWishService } from './activity-wish.service';
import { ActivityWish } from './entity/activity-wish.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateActivityWishDto } from './dto/create-activity-wish.dto';

@ApiTags('activity-wishes')
@Controller('activity-wishes')
export class ActivityWishController {
  constructor(private readonly activityWishService: ActivityWishService) {}

  @Post()
  @ApiOperation({
    summary: '액티비티 좋아요 추가',
    description: '사용자가 특정 액티비티에 대한 좋아요를 추가',
  })
  @ApiResponse({
    status: 201,
    description: '좋아요 추가',
    type: ActivityWish,
  })
  addWish(
    @Body() createActivityWishDto: CreateActivityWishDto,
  ): Promise<ActivityWish> {
    return this.activityWishService.addWish(
      createActivityWishDto.userId,
      createActivityWishDto.activitiesId,
    );
  }

  @Delete(':userId/:activitiesId')
  @ApiOperation({
    summary: '액티비티 좋아요 취소',
    description: '사용자가 특정 액티비티에 대한 좋아요를 취소합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요가 성공적으로 취소되었습니다.',
  })
  removeWish(
    @Param('userId') userId: string,
    @Param('activitiesId') activitiesId: string,
  ): Promise<void> {
    return this.activityWishService.removeWish(
      Number(userId),
      Number(activitiesId),
    );
  }

  @Get('user/:userId')
  @ApiOperation({
    summary:
      '사용자의 모든 좋아요 조회 -> userID 파라미터 사라질 예정 -> 차후에 인증인가 기능 추가하여 로그인 유저 데이터로 가져오게 할 예정',
    description:
      '특정 사용자의 모든 좋아요 목록을 조회 -> 차후에 인가인증 추가되면 액티비티 리스트로 반환되게 만들 예정',
  })
  @ApiResponse({
    status: 200,
    description: '좋아요 목록을 성공적으로 반환했습니다.',
    type: [ActivityWish],
  })
  findAllWishesByUserId(
    @Param('userId') userId: string,
  ): Promise<ActivityWish[]> {
    return this.activityWishService.findAllWishesByUserId(Number(userId));
  }

  @Get('activity/:activitiesId')
  @ApiOperation({
    summary: '액티비티의 모든 좋아요 조회',
    description: '특정 액티비티에 대한 모든 좋아요를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '액티비티에 대한 좋아요 목록을 성공적으로 반환했습니다.',
    type: [ActivityWish],
  })
  findAllWishesByActivityId(
    @Param('activitiesId') activitiesId: string,
  ): Promise<ActivityWish[]> {
    return this.activityWishService.findAllWishesByActivityId(
      Number(activitiesId),
    );
  }
}
