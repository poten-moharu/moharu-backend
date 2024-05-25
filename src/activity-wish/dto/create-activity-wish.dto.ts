import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityWishDto {
  @ApiProperty({ example: 1, description: '액티비티 ID' })
  activitiesId: number;
}
