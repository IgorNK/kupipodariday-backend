import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  Min,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishDto {
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

  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  @ApiProperty({
    description: "The item's description",
    example: 'About item',
  })
  description: string;
}
