import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 25, description: '사용자의 나이' })
  age: number;

  @ApiProperty({ example: '123456789', description: '사용자의 소셜 ID' })
  socialId: string;
}
