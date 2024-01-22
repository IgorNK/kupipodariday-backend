import { HttpException, HttpStatus } from '@nestjs/common';

export class OfferNotFoundException extends HttpException {
  constructor() {
    super('Offer not found', HttpStatus.BAD_REQUEST);
  }
}
