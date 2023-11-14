import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities';

@Module({
  controllers: [AddressController],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressService]
})
export class AddressModule {}
