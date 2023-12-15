import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, LoginPayload, ReturnLoginDto } from './dtos';
import { UserEntity } from '../user/entities';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { returnUserDto } from '../user/dtos';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || ''
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new returnUserDto(user)
    };
  }
}
