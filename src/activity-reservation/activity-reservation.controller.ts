import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityReservationService } from './activity-reservation.service';
import { CreateActivityReservationDto } from './dto/create-activity-reservation.dto';
import { UpdateActivityReservationDto } from './dto/update-activity-reservation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActivityReservation } from './entity/activity-reservation.entity';

@ApiTags('activity-reservation')
@Controller('activity-reservation')
export class ActivityReservationController {
  constructor(private readonly activityReservationService: ActivityReservationService) {}

  @Post()
  @ApiOperation({ summary: '예약 등록' })
  @ApiResponse({ status: 201, description: '활동이 성공적으로 생성되었습니다.', type: ActivityReservation })
  reservationCreate(@Body() createActivityReservationDto: CreateActivityReservationDto) {
    return this.activityReservationService.reservationCreate(createActivityReservationDto);
  }

  @Get()
  findAll() {
    return this.activityReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityReservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityReservationDto: UpdateActivityReservationDto) {
    return this.activityReservationService.update(+id, updateActivityReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityReservationService.remove(+id);
  }
}
