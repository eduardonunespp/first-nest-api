import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return this.userService.createUser(createUser);
  }
}
