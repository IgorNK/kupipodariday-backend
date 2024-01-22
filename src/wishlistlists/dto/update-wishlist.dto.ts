import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsArray,
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWishlistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  @ApiProperty({
    description: 'Wishlist name',
    example: 'Мой вишлист',
  })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Link to image',
    example: 'http://example.com/image.png',
  })
  image: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item IDs',
    example: '[1, 2]',
  })
  itemsId: number[];
}
