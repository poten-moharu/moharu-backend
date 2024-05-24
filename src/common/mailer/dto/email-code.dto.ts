import { ApiProperty } from '@nestjs/swagger';

export class EmailCodeSendDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
