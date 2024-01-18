import { IsNotEmpty, IsString, IsNumber, IsEmail, IsUrl, IsDate, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUsersDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Search query: username or email',
    example: 'johndoe@example.com',
  })
  query: string;
}