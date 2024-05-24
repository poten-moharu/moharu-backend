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
  @Column({ name: 'cover_image', type: 'varchar', length: 255 })
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
  @Column({ name: 'start_date', type: 'datetime' })
  startDate: Date;

  @ApiProperty({
    example: '2023-01-01T12:00:00Z',
    description: '활동의 종료 날짜 및 시간',
  })
  @Column({ name: 'end_date', type: 'datetime' })
  endDate: Date;

  @ApiProperty({ example: '메인 홀', description: '활동의 위치' })
  @Column({ type: 'varchar', length: 255 })
  location: string;
}
