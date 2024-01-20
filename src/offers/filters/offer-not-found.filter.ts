import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { OfferNotFoundException } from '../exceptions/offer-not-found.exception';

@Catch(OfferNotFoundException)
export class OfferNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: OfferNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 400;
    const message = exception.getResponse() || 'Offer not found';
    response.status(status).json({
      status,
      message,
      method: request.method,
      url: request.url,
    });
  }
}
