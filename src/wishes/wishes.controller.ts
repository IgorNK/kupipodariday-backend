import {
  Controller,
  Get,
  Post,
  Body,
  Header,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishNotFoundExceptionFilter } from './filters/wish-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('wishes')
@ApiTags('wishes')
@UseInterceptors(CacheInterceptor)
@UseFilters(WishNotFoundExceptionFilter)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(createWishDto);
  }

  @Post(':id/copy')
  async copy(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.copy(+id);
  }

  @CacheKey('wishes')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get('last')
  async findLast(): Promise<Wish> {
    return this.wishesService.findLast();
  }

  @CacheKey('wishes')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get('top')
  async findTop(): Promise<Wish> {
    return this.wishesService.findTop();
  }

  @CacheKey('wishes')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Wish entity', type: Wish })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wish> {
    return await this.wishesService.findOne(+id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishesService.updateOne(+id, updateWishDto);
  }

  @Delete(':id')
  removeOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.wishesService.removeOne(+id);
  }
}
