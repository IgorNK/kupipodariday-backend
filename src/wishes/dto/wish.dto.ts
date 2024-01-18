import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsUrl,
  IsDate,
  IsOptional,
  IsArray,
  Min,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserPublicProfileResponseDto } from '../../users/dto/user-public-profile-response.dto';
import { Offer } from '../../offers/entities/offer.entity';

export class WishDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item ID',
    example: '1',
  })
  id: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  @ApiProperty({
    description: 'Item name',
    example: 'item',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Link to the web store',
    example: 'ebay.com',
  })
  link: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Link to image',
    example: 'http://example.com/image.png',
  })
  image: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: "The item's price",
    example: '100',
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  raised: number;

  @IsNotEmpty()
  @ApiProperty()
  owner: UserPublicProfileResponseDto;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  @ApiProperty({
    description: "The item's description",
    example: 'About item',
  })
  description: string;

  @IsArray()
  @ApiProperty()
  offers: Offer[];

  @IsNumber()
  @ApiProperty()
  copied: number;
}
