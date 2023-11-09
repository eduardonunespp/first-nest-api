import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos';

@Controller('user')
export class UserController {
  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return {
      ...createUser,
      password: undefined
    };
  }
}
