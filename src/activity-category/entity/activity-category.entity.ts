import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Activity } from '../../activity/entity/activity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('activities_category')
export class ActivityCategory {
  @ApiProperty({ example: 1, description: '카테고리의 고유 식별자' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '예술', description: '카테고리 이름' })
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @ApiProperty({
    example: '예술과 관련된 내용',
    description: '카테고리 설명',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: 'icon.png', description: '카테고리 아이콘 URL' })
  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @OneToMany(() => Activity, (activity) => activity.activityCategory, { nullable: true })
  activities: Activity[];
}
