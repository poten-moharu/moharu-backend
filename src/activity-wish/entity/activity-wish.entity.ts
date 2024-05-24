import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Unique, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entity/user.entity'; // User 엔티티 임포트 필요
import { Activity } from '../../activity/entity/activity.entity'; // Activity 엔티티 임포트 필요

@Entity('activities_wish')
@Unique(['userId', 'activitiesId']) // 유니크 키 설정
export class ActivityWish {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ example: 1 })
  userId: number;

  @ManyToOne(() => Activity, (activity) => activity.id, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'activities_id' })
  @ApiProperty({ example: 1 })
  activity: Activity;

  @Column({ name: 'activities_id' }) // 외래 키 필드 명시
  @ApiProperty({ example: 1 })
  activitiesId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;
}
