import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../entity/activity.entity';
import { isBoolean } from 'class-validator';

export class ActivityDetailResponseDto {
  @ApiProperty({ type: [Activity] })
  activity: Activity;

  @ApiProperty({ type: Boolean })
  isWish: boolean;
}
