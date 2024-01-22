import { IsNotEmpty, IsString, IsUrl, IsArray, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  @ApiProperty({
    description: 'Wishlist name',
    example: 'Мой вишлист',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Link to image',
    example: 'http://example.com/image.png',
  })
  image: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item IDs',
    example: '[1, 2]',
  })
  itemsId: number[];
}
