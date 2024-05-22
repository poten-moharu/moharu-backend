import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('email_verifications')
export class EmailVerification {
  @PrimaryColumn()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column({ name: 'verification_code', type: 'varchar', length: 6 })
  @ApiProperty({ example: '240523' })
  verificationCode: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp' })
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  expiresAt: Date;

  @Column({ name: 'is_verified', type: 'tinyint', default: 0 })
  @ApiProperty({ example: false })
  isVerified: boolean;
}
