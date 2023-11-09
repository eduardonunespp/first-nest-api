import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [],
  exports: []
})
export class UserModule {}
