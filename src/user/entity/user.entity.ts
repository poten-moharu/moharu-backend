import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'The profile image URL of the user',
  })
  profileImage: string;

  @Column({ type: 'tinyint', nullable: false })
  @ApiProperty({ example: 25, description: 'The age of the user' })
  age: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    example: '123456789',
    description: 'The social ID of the user',
  })
  socialId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the user was created',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the user was last updated',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the user was deleted',
  })
  deletedAt: Date;
}
