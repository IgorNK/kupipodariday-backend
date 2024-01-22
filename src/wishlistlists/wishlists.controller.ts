import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistNotFoundExceptionFilter } from './filters/wishlist-not-found.filter';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('wishlistlists')
@ApiTags('wishlistlists')
@UseFilters(WishlistNotFoundExceptionFilter)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }

  @Get()
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wishlist> {
    return this.wishlistsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<UpdateResult> {
    return this.wishlistsService.updateOne(id, updateWishlistDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Req() req, @Param('id') id: number): Promise<DeleteResult> {
    return this.wishlistsService.removeOne(id, req.user);
  }
}
