import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateAuthResponseDto {
  @ApiProperty({ description: '액세스 토큰' })
  accessToken: string;

  @ApiProperty({ description: '유저 정보', type: () => CreateUserDto })
  user: CreateUserDto;
}
