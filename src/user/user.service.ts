import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dtos';
import { User } from './interfaces';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: createUserDto): Promise<User> {
    const saltOrRounds = 10;

    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passwordHashed
    };

    this.users.push(user);

    return user;
  }

  async getAlluser(): Promise<User[]> {
    return this.users;
  }
}
