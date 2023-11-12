import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dtos';
import { UserEntity } from './interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
