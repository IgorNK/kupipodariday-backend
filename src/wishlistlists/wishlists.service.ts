import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistNotFoundException } from './exceptions/wishlist-not-found.exception';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.create(createWishlistDto);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<UpdateResult> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new WishlistNotFoundException();
    }
    return this.wishlistRepository.update(id, updateWishlistDto);
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new WishlistNotFoundException();
    }
    return this.wishlistRepository.delete(id);
  }
}
