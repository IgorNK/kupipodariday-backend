import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WishNotFoundException } from '../exceptions/wish-not-found.exception';

@Catch(WishNotFoundException)
export class WishNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: WishNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || 'Wish not found';
    response.status(status).json({
      status,
      message,
      method: request.method,
      url: request.url,
    });
  }
}
