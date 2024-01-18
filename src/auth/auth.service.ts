import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserExistsException } from './exceptions/user-exists.exception';
import { DatabaseError } from 'pg-protocol';
import { QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
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
}
