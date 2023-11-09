import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos';
import { User } from './interfaces';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: createUserDto): Promise<User> {
    return {
      ...createUserDto,
      id: 1
    };
  }
}
