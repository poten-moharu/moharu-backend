import { ApiProperty } from '@nestjs/swagger';

export class EmailCodeVerifyDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '240523' })
  code: string;
}
