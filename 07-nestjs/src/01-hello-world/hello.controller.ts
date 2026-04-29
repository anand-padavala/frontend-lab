import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { HelloService } from './hello.service';
import { UserService } from './user.service';
import { ApiKeyGuard } from './api-key.guard';
import { JwtGuard } from './jwt.guard';

@Controller()
export class HelloController {
  constructor(
    private readonly helloService: HelloService,
    private readonly userService: UserService,
  ) { }

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('about')
  getAbout(): string {
    return 'NestJS Hello World - Lesson111 ';
  }

  @Get('secret') 
  @UseGuards(ApiKeyGuard)
  getSecret(): string {
    return 'You found the secret!';
  }

  @Get('users')
  @UseGuards(JwtGuard)
  getAllUsers(): any {
    return this.userService.getAllUsers();
  }

  @Get('profile/:id')
  @UseGuards(JwtGuard)
  getProfileById(@Param('id') id: string): any {
    const userId = parseInt(id, 10);
    const user = this.userService.getProfile(userId);

    if (!user) {
      return { error: 'User not found' };
    }

    return { message: `Profile for user ${userId}`, user };
  }
}
