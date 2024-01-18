import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findMany(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const user = await this.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.delete(id);
  }
}
