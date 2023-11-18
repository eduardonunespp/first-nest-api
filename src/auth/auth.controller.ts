import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { returnUserDto } from 'src/user/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() login: LoginDto): Promise<returnUserDto> {
    return new returnUserDto(await this.authService.login(login));
  }
}
