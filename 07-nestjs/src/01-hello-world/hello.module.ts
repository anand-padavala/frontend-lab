import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { UserService } from './user.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [HelloController],
  providers: [HelloService, UserService],
})
export class HelloModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
