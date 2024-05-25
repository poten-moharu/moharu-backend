import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../entity/activity.entity';

export class ActivityWishlistResponseDto {
  @ApiProperty({ type: [Activity] })
  activities: Activity[];

  @ApiProperty({ example: 10 })
  totalCount: number;
}
