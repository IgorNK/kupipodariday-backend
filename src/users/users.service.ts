import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignupUserResponseDto } from './dto/sign-up-user-response.dto';
import User from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<SignupUserResponseDto> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    createUserDto.password = hashedPassword;
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user) as Promise<SignupUserResponseDto>;
  }

  async findAll(): Promise<User[]> {
    console.log('find all in users service');
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
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
