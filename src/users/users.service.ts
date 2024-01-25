import { Injectable, ConflictException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignupUserResponseDto } from './dto/sign-up-user-response.dto';
import User from './entities/user.entity';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseError } from 'pg-protocol';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { FindUsersDto } from './dto/find-users.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';

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
    try {
      const user = this.userRepository.create(createUserDto);
      const response = await this.userRepository.save(user);
      const { password: _, ...rest } = response;
      return rest;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError as DatabaseError;
        if (err.code === '23505') {
          throw new ConflictException('username or email already exists');
        }
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
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

  async findMany(
    findUsersDto: FindUsersDto,
  ): Promise<UserPublicProfileResponseDto[]> {
    return this.userRepository.find({
      where: [{ username: findUsersDto.query }, { email: findUsersDto.query }],
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateOne(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const { password } = updateUserDto;
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updateUserDto.password = hashedPassword;
    }
    try {
      const updatedUser = await this.userRepository.save({
        id,
        ...updateUserDto,
      });
      const {
        password: _password,
        wishes: _wishes,
        offers: _offers,
        wishlists: _wishlists,
        ...rest
      } = updatedUser;
      return rest;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError as DatabaseError;
        if (err.code === '23505') {
          throw new ConflictException('username or email already exists');
        }
      }
    }
  }

  async removeOne(id: number): Promise<DeleteResult> {
    const user = await this.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.delete(id);
  }
}
