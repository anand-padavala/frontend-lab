import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'alice', email: 'alice@example.com' },
    { id: 2, username: 'bob', email: 'bob@example.com' },
  ];

  getProfile(userId: number) {
    return this.users.find(u => u.id === userId) || null;
  }

  getAllUsers() {
    return this.users;
  }
}
