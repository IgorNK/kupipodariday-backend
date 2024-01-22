import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistNotFoundException } from './exceptions/wishlist-not-found.exception';
import User from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(
    createWishlistDto: CreateWishlistDto,
    user: User,
  ): Promise<Wishlist> {
    const wishlistWithUser = {
      ...createWishlistDto,
      owner: user,
      items: createWishlistDto.itemsId.map((item) => {
        return { id: item };
      }),
    };
    const wishlist = await this.wishlistRepository.create(wishlistWithUser);
    return this.wishlistRepository.save(wishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: ['owner'],
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({
      where: {
        id,
      },
      relations: ['owner', 'items'],
      select: {
        owner: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
        },
        items: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          link: true,
          image: true,
          price: true,
          raised: true,
          copied: true,
          description: true,
        },
      },
    });
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    user: User,
  ): Promise<UpdateResult> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new WishlistNotFoundException();
    }
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException();
    }
    return this.wishlistRepository.update(id, updateWishlistDto);
  }

  async removeOne(id: number, user: User): Promise<DeleteResult> {
    const wishlist = await this.findOne(id);
    if (!wishlist) {
      throw new WishlistNotFoundException();
    }
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException();
    }
    return this.wishlistRepository.delete(id);
  }
}
