import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger('ApiKeyGuard');
  private readonly validKey = 'secret-123';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const handlerName = context.getHandler().name;
    const controllerName = context.getClass().name;

    this.logger.log(`Checking auth for ${controllerName}.${handlerName}()`);

    const apiKey = request.header('x-api-key');

    if (apiKey !== this.validKey) {
      throw new UnauthorizedException('Invalid or missing x-api-key header');
    }

    return true;
  }
}
