import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { DatabaseError } from 'pg-protocol';
import { InjectRepository } from '@nestjs/typeorm';
import { UserExistsException } from './exceptions/user-exists.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User;
    try {
      user = this.userRepository.create(createUserDto);
      
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const err = error.driverError as DatabaseError;
        if (err.code === '23505') {
          throw new UserExistsException();
        }
      }            
    } finally {
      return user;
    }
  }
  
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      }
    });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const user = await this.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return this.userRepository.update(id, updateUserDto);
  }
}
