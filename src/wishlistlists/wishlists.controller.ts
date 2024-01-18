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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistNotFoundExceptionFilter } from './filters/wishlist-not-found.filter';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('wishlistlists')
@ApiTags('wishlistlists')
@UseInterceptors(CacheInterceptor)
@UseFilters(WishlistNotFoundExceptionFilter)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto);
  }

  @CacheKey('wishlists')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get()
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @CacheKey('wishlists')
  @CacheTTL(3600)
  @Header('Cache-Control', 'no-cache, max-age=3600')
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<UpdateResult> {
    return this.wishlistsService.updateOne(+id, updateWishlistDto);
  }

  @Delete(':id')
  async removeOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.wishlistsService.removeOne(+id);
  }
}
