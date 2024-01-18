import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WishlistNotFoundException } from '../exceptions/wishlist-not-found.exception';

@Catch()
export class WishlistNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: WishlistNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || 'Wishlist not found';
    response.status(status).json({
      status,
      message,
      method: request.method,
      url: request.url,
    });
  }
}
