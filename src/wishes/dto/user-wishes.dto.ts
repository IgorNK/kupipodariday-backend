import { IsNotEmpty, IsString, IsNumber, IsArray, IsEmail, IsUrl, IsDate, IsOptional, Min, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Offer } from '../../offers/entities/offer.entity';

export class UserWishesDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item ID',
    example: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @IsDate()
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
    description: 'The item\'s price',
    example: '100',
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'How much the item raised',
    example: '100',
  })
  raised: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'How much the item was copied',
    example: '100',
  })
  copied: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  @ApiProperty({
    description: 'The item\'s description',
    example: 'About item',
  })
  description: string;

  @IsArray()
  @ApiProperty({
    description: 'Offers featuring item',
  })
  offers: Offer[];
}
