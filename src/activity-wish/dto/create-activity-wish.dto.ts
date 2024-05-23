import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityWishDto {
  @ApiProperty({ example: 1, description: '사용자 ID' })
  userId: number;

  @ApiProperty({ example: 1, description: '액티비티 ID' })
  activitiesId: number;
}
