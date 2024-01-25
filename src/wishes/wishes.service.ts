import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import User from '../users/entities/user.entity';
import { WishNotFoundException } from './exceptions/wish-not-found.exception';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    const wishWithUser = {
      ...createWishDto,
      owner: {
        id: user.id,
      },
    };
    const wish = this.wishRepository.create(wishWithUser);
    return this.wishRepository.save(wish);
  }

  async copy(id: number, user: User) {
    const copiedWish: Wish = await this.findOne(id);
    if (!copiedWish) {
      throw new WishNotFoundException();
    }
    if (copiedWish.owner.id === user.id) {
      throw new BadRequestException('Wish is already owned.');
    }
    copiedWish.copied = Number(+copiedWish.copied) + 1;
    const {
      id: _id,
      raised: _raised,
      owner: _owner,
      offers: _offers,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      copied: _copied,
      ...newWishDto
    } = copiedWish;
    const wishWithUser = {
      ...newWishDto,
      owner: {
        id: user.id,
      },
    };
    const wish = this.wishRepository.create(wishWithUser);
    await this.wishRepository.save(copiedWish);
    return this.wishRepository.save(wish);
  }

  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: {
        id,
      },
      relations: ['owner', 'offers', 'offers.user'],
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
    wish.offers.forEach((offer) => {
      offer.name = offer.user.username;
      offer.img = offer.user.avatar;
    });
    return wish;
  }

  async findLast(amount: number): Promise<Wish[]> {
    return this.wishRepository.find({
      where: {},
      order: { createdAt: 'DESC' },
      relations: ['owner', 'offers'],
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
      take: amount,
    });
  }

  async findTop(amount: number): Promise<Wish[]> {
    return this.wishRepository.find({
      where: {},
      order: { copied: 'DESC' },
      relations: ['owner', 'offers'],
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
      take: amount,
    });
  }

  async findByUser(user: User) {
    return this.wishRepository.find({
      where: {
        owner: {
          id: user.id,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async updateOne(
    id: number,
    updateWishDto: UpdateWishDto,
    user: User,
  ): Promise<UpdateResult> {
    const wish = await this.findOne(id);
    if (!wish) {
      throw new WishNotFoundException();
    }
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException();
    }
    return this.wishRepository.update(id, updateWishDto);
  }

  async removeOne(id: number, user: User): Promise<DeleteResult> {
    const wish = await this.findOne(id);
    if (!wish) {
      throw new WishNotFoundException();
    }
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException();
    }
    return this.wishRepository.delete(id);
  }
}
