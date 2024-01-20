import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EmailExistsException } from '../exceptions/email-exists.exception';

@Catch(EmailExistsException)
export class EmailExistsExceptionFilter implements ExceptionFilter {
  catch(exception: EmailExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || 'Email already exists';
    response.status(status).json({
      status,
      message,
      method: request.method,
      url: request.url,
    });
  }
}
