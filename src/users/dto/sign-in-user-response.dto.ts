import { IsNotEmpty, IsString, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserResponseDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  @ApiProperty({
    description: 'JWT-token',
  })
  access_token: string;
}
