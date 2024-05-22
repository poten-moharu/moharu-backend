import { Controller, Get } from '@nestjs/common';
import { ActivityCategoryService } from './activity-category.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityCategory } from './entity/activity-category.entity';

@ApiTags('activity-categories')
@Controller('activities-category')
export class ActivityCategoryController {
  constructor(
    private readonly activityCategoryService: ActivityCategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: '모든 카테고리 조회' })
  @ApiResponse({
    status: 200,
    description: '모든 카테고리를 반환합니다.',
    type: [ActivityCategory],
  })
  findAll() {
    return this.activityCategoryService.findAll();
  }
}
