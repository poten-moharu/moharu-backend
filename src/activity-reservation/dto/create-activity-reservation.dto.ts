import { IsInt, IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityType } from 'src/activity/entity/activity.entity';

export class CreateActivityReservationDto {
  @IsInt()
  @ApiProperty({ example: 1, description: 'user의 ID' })
  userId: number;

  @IsInt()
  @ApiProperty({ example: 1, description: 'activities의 ID' })
  activitiesId: number;

  @IsString()
  @ApiProperty({ example: 'meeting', description: '활동의 유형' })
  type: string;

  @IsString()
  @ApiProperty({ example: '팀 미팅', description: '활동의 제목' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '서울시 강남구', description: '활동의 주소', required: false })
  place?: string;

  @IsString()
  @ApiProperty({ example: '1/21(화) 오후 2:00', description: '활동의 날짜 및 시간' })
  date: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 2, description: '예약 총 인원 수', required: false })
  capacity?: number;

  @IsNumber()
  @ApiProperty({ example: 39800, description: '결재금액' })
  amount: number;
}
