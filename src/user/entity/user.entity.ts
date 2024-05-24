import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, SocialTypeEnum, AgeRangeEnum } from '../enum';
import { ActivityWish } from 'src/activity-wish/entity/activity-wish.entity';
import { Activity } from 'src/activity/entity/activity.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  @ApiProperty({ example: 'John' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ example: 'password1234' })
  password: string;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    length: 255,
    default: 'https://example.com/profile.jpg',
  })
  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profileImage: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  @ApiProperty({ example: '010-1234-5678' })
  telephone: string;

  @Column({ type: 'varchar', length: 4, nullable: true })
  @ApiProperty({ example: 'ISFJ' })
  mbti: string;

  @Column({
    name: 'age_range',
    type: 'enum',
    enum: AgeRangeEnum,
    default: AgeRangeEnum.ETC,
    nullable: true,
  })
  @ApiProperty({ example: '20대' })
  ageRange: AgeRangeEnum;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.ETC,
    nullable: true,
  })
  @ApiProperty({ example: 'etc' })
  gender: GenderEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ example: '서울' })
  region: string;

  @Column({
    name: 'social_type',
    type: 'enum',
    enum: SocialTypeEnum,
    default: SocialTypeEnum.LOCAL,
  })
  @ApiProperty({ example: 'local' })
  socialType: SocialTypeEnum;

  @Column({ name: 'social_id', type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ example: 'social-id-key' })
  socialId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  deletedAt: Date;

  @OneToMany(() => ActivityWish, (activityWish) => activityWish.userId)
  activityWishes: ActivityWish[];

  @OneToMany(() => Activity, (activities) => activities.id)
  activities: Activity[];
}
