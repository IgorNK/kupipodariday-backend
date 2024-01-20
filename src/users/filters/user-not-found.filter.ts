import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || 'User not found';
    response.status(status).json({
      status,
      message,
      method: request.method,
      url: request.url,
    });
  }
}
