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
}
