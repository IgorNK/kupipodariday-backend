import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: 'How many items',
    example: '1',
  })
  amount: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Is user hidden',
    example: 'false',
  })
  hidden: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item unique id',
    example: '1',
  })
  itemId: number;
}
