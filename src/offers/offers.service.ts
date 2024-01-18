import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferNotFoundException } from './exceptions/offer-not-found.exception';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offerRepository.create(createOfferDto);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      where: {
        id,
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
