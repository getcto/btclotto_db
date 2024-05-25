import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const redirectURL = new URL(this.configService.get('WEBAPP_URL'));
    redirectURL.searchParams.append('error', 'access_denied');
    response.status(status).redirect(redirectURL.href);
  }
}
