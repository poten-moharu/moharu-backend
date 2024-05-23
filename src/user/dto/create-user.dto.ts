import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, SocialTypeEnum, AgeRangeEnum } from '../enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자의 이메일 주소',
  })
  email: string;

  @ApiProperty({ example: 'John', description: '사용자의 이름' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '사용자의 프로필 이미지 URL',
  })
  profileImage: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: '사용자의 전화번호',
  })
  telephone?: string;

  @ApiProperty({
    example: 'ISFJ',
    description: '사용자의 MBTI',
  })
  mbti?: string;

  @ApiProperty({
    example: '20대',
    description: '사용자의 연령대',
    enum: AgeRangeEnum,
  })
  ageRange?: AgeRangeEnum;

  @ApiProperty({
    example: 'etc',
    description: '사용자의 성별',
    enum: GenderEnum,
  })
  gender?: GenderEnum;

  @ApiProperty({
    example: '서울',
    description: '사용자의 지역',
  })
  region?: string;

  @ApiProperty({
    example: 'local',
    description: '소셜 로그인 타입',
    enum: SocialTypeEnum,
  })
  socialType: SocialTypeEnum;

  @ApiProperty({
    example: 'social-id-key',
    description: '소셜 로그인 ID',
  })
  socialId: string;
}
