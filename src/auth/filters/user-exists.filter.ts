import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UserExistsException } from '../exceptions/user-exists.exception';

@Catch()
export class UserExistsExceptionFilter implements ExceptionFilter {
  catch(exception: UserExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || "User already exists";
    response
      .status(status)
      .json({ 
        status,
        message,
        method: request.method,
        url: request.url,
      });
  }
}
