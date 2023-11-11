import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDto } from './dtos';
import { UserService } from './user.service';
import { UserEntity } from './interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: createUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAllUser();
  }
}
