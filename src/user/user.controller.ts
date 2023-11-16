import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { createUserDto } from './dtos';
import { UserService } from './user.service';
import { UserEntity } from './entities';
import { returnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<returnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new returnUserDto(userEntity)
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<returnUserDto> {
    return new returnUserDto(
      await this.userService.getUserByIdUsingRelations(userId)
    );
  }
}
