import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger('JwtGuard');
  private readonly validTokens = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_1.sig',  // fake token for user 1
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_2.sig',  // fake token for user 2
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const handlerName = context.getHandler().name;

    this.logger.log(`JWT guard checking ${handlerName}()`);

    const authHeader = request.header('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // Extract Bearer token
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format. Use: Bearer <token>');
    }

    if (!this.validTokens.includes(token)) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Extract user ID from token (format: eyJ...user_<id>.sig)
    const userIdMatch = token.match(/user_(\d+)/);
    if (!userIdMatch) {
      throw new UnauthorizedException('Malformed token');
    }

    const userId = parseInt(userIdMatch[1], 10);

    // Attach to request so controller can access it
    (request as any)['user'] = { id: userId };
    this.logger.log(`User ${userId} authenticated`);

    return true;
  }
}
