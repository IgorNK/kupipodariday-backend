import { HttpException, HttpStatus } from '@nestjs/common';

export class WishlistNotFoundException extends HttpException {
  constructor() {
    super('Wishlist not found', HttpStatus.BAD_REQUEST);
  }
}
