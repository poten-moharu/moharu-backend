import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ActivityCategory } from '../../activity-category/entity/activity-category.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ActivityType {
  MEETING = 'meeting',
  PLACE = 'place',
  EVENT = 'event',
}

export enum ActivityStatus {
  PLANNED = 'planned',
  OPEN = 'open',
  CLOSED = 'closed',
  ENDED = 'ended',
}

@Entity('activities')
export class Activity {
  @ApiProperty({ example: 1, description: '활동의 고유 식별자' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'activity-category의 ID ',
    type: Number,
  })
  @Column({ name: 'category_id', type: 'bigint' })
  categoryId: number;

  @ManyToOne(() => ActivityCategory, (category) => category.activities)
  @JoinColumn({ name: 'category_id' })
  activityCategory: ActivityCategory;

  @ApiProperty({ example: '팀 미팅', description: '활동의 제목' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'image.jpg', description: '활동의 커버 이미지 URL' })
  @Column({ name: 'cover_image', type: 'text', nullable: true })
  coverImage: string;

  @ApiProperty({ enum: ActivityType, description: '활동의 유형' })
  @Column({
    type: 'enum',
    enum: ActivityType,
  })
  type: ActivityType;

  @ApiProperty({ example: '서울시 강남구', description: '활동의 주소' })
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ApiProperty({ enum: ActivityStatus, description: '활동의 현재 상태' })
  @Column({
    type: 'enum',
    enum: ActivityStatus,
  })
  status: ActivityStatus;

  @ApiProperty({
    example: '2023-01-01T10:00:00Z',
    description: '활동의 시작 날짜 및 시간',
  })
  @Column({ name: 'start_date', type: 'datetime', nullable: true })
  startDate: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: '활동의 종료 날짜 및 시간',
  })
  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate: Date;

  @ApiProperty({ example: '메인 홀', description: '활동의 위치', nullable: true })
  @Column({ type: 'varchar', length: 255 })
  location: string;

  @ApiProperty({ example: '09:00 ~ 18:00', description: '활동의 영업 시간' })
  @Column({ name: 'business_hours', type: 'varchar', length: 50, nullable: true })
  businessHours: string;

  @ApiProperty({ example: '월/화', description: '활동의 휴무일' })
  @Column({ name: 'holidays', type: 'varchar', length: 50, nullable: true })
  holidays: string;

  @ApiProperty({
    example: [
      { label: '전화', value: '02-6002-3031', type: 'TEXT' },
      { label: '이메일', value: 'example@example.com', type: 'TEXT' },
      { label: '상세 설명', value: '<p>여기에는 HTML 형식의 상세 설명이 들어갑니다.</p>', type: 'HTML' },
    ],
    description: '상세페이지에 표시할 추가 정보',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', example: '전화' },
        value: { type: 'string', example: '02-6002-3031' },
        type: { type: 'string', example: 'TEXT' },
      },
    },
  })
  @Column({ name: 'additional_info', type: 'json', nullable: true })
  additionalInfo: Array<{ label: string; value: string; type: string }>;

  @ApiProperty({ example: 'http://example.com', description: '활동 페이지의 URL' })
  @Column({ name: 'link', type: 'varchar', length: 255 })
  link: string;
}
