import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../entity/activity.entity';

export class ActivityResponseDto {
  @ApiProperty({ type: [Activity] })
  activities: Activity[];

  @ApiProperty({ type: [Number] })
  wishedActivityIds: number[];
}
