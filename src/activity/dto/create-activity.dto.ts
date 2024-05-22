import { ApiProperty } from '@nestjs/swagger';
import { ActivityType, ActivityStatus } from '../entity/activity.entity';

export class CreateActivityDto {
  @ApiProperty({ example: 1, description: '연관된 카테고리의 식별자' })
  category_id: number;

  @ApiProperty({ example: '팀 미팅', description: '활동의 제목' })
  title: string;

  @ApiProperty({ example: 'image.jpg', description: '활동의 커버 이미지 URL' })
  cover_image: string;

  @ApiProperty({ enum: ActivityType, description: '활동의 유형' })
  type: ActivityType;

  @ApiProperty({ example: '서울시 강남구', description: '활동의 주소' })
  address: string;

  @ApiProperty({ enum: ActivityStatus, description: '활동의 현재 상태' })
  status: ActivityStatus;

  @ApiProperty({
    example: '2023-01-01T10:00:00Z',
    description: '활동의 시작 날짜 및 시간',
  })
  start_date: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: '활동의 종료 날짜 및 시간',
  })
  end_date: Date;

  @ApiProperty({ example: '메인 홀', description: '활동의 위치' })
  location: string;
}
