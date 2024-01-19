import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsUrl,
  IsDate,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  @ApiProperty({
    description: "The user's name",
    example: 'John Doe',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The user's password",
    example: 'derpassword',
  })
  password: string;
}
