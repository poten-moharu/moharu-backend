import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Activity } from './entity/activity.entity';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: '새로운 활동 생성' })
  @ApiResponse({
    status: 201,
    description: '활동이 성공적으로 생성되었습니다.',
    type: Activity,
  })
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 활동 조회' })
  @ApiResponse({
    status: 200,
    description: '모든 활동을 반환합니다.',
    type: [Activity],
  })
  findAll() {
    return this.activityService.findAll();
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

  @Put(':id')
  @ApiOperation({ summary: 'ID로 활동 수정' })
  @ApiResponse({
    status: 200,
    description: '활동이 성공적으로 수정되었습니다.',
    type: Activity,
  })
  @ApiResponse({ status: 404, description: '활동을 찾을 수 없습니다.' })
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: CreateActivityDto,
  ) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID로 활동 삭제' })
  @ApiResponse({
    status: 200,
    description: '활동이 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({ status: 404, description: '활동을 찾을 수 없습니다.' })
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: '카테고리 ID로 활동 조회' })
  @ApiResponse({
    status: 200,
    description: '주어진 카테고리 ID를 가진 모든 활동을 반환합니다.',
    type: [Activity],
  })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.activityService.findByCategory(+categoryId);
  }
}
