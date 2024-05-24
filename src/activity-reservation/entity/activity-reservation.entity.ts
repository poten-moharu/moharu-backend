import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Activity, ActivityType } from 'src/activity/entity/activity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('activites_reservations')
export class ActivityReservation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: '예약의 고유 식별자' })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ example: 1, description: 'user의 ID' })
  userId: number;

  @ManyToOne(() => Activity, (activity) => activity.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activities_id' })
  @ApiProperty({ example: 1, description: 'activities의 ID' })
  activitiesId: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'meeting', description: '활동의 유형' })
  type: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: '팀 미팅', description: '활동의 제목' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ example: '서울시 강남구', description: '활동의 주소' })
  place: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: '2024-01-01T12:00:00Z', description: '활동의 날짜 및 시간' })
  date: string;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  @ApiProperty({ example: 2, description: '예약 총 인원 수' })
  capacity: number;

  @Column({ type: 'int' })
  @ApiProperty({ example: 39800, description: '결재금액' })
  amount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  deletedAt: Date;
}
