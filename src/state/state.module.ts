import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities';

@Module({
  controllers: [StateController],
  imports: [TypeOrmModule.forFeature([StateEntity])],
  providers: [StateService]
})
export class StateModule {}
