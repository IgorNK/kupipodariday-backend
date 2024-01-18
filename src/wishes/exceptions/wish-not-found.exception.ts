import { HttpException, HttpStatus } from '@nestjs/common';

export class WishNotFoundException extends HttpException {
  constructor() {
    super('Wish not found', HttpStatus.BAD_REQUEST);
  }
}
