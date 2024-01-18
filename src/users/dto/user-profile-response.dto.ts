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

export class UserProfileResponseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

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
  @Length(2, 200)
  @ApiProperty({
    description: "User's about",
    example: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: "User's avatar",
    example: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "The user's email",
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
