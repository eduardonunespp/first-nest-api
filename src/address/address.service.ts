import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>
  ) {}

  async createAddress(createAddressDto: CreateAddressDto, userId: string) {
    return this.addressRepository.save({
      ...createAddressDto,
      userId
    });
  }
}
