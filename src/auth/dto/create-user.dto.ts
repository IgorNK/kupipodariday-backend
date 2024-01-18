import { IsNotEmpty, IsString, IsNumber, IsEmail, IsUrl, IsDate, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  @ApiProperty({
    description: 'The user\'s name',
    example: 'John Doe',
  })
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  @ApiProperty({
    description: 'User\'s about',
    example: 'Пока ничего не рассказал о себе',
  })
  about: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'User\'s avatar',
    example: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The user\'s email',
    example: 'johndoe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user\'s password',
    example: 'derpassword',
  })
  password: string;
}