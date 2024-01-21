import { Inject, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferNotFoundException } from './exceptions/offer-not-found.exception';
import User from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const offerWithUser = {
      ...createOfferDto,
      user,
      item: { id: createOfferDto.itemId },
    };
    const wish = await this.wishRepository.findOne({
      where: {
        id: createOfferDto.itemId,
      },
    });
    wish.raised = Number(+wish.raised) + createOfferDto.amount;
    const offer = this.offerRepository.create(offerWithUser);
    await this.wishRepository.save(wish);
    return this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: ['user', 'item'],
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          wishes: true,
          offers: true,
          wishlists: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      where: {
        id,
      },
      relations: ['user', 'item'],
      select: {
        user: {
          id: true,
          username: true,
          about: true,
          avatar: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          wishes: true,
          offers: true,
          wishlists: true,
        },
      },
    });
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const offer = await this.findOne(id);
    if (!offer) {
      throw new OfferNotFoundException();
    }
    return this.offerRepository.delete(id);
  }
}
