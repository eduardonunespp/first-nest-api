import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: string
  ): Promise<AddressEntity> {
    return this.addressRepository.save({
      ...createAddressDto,
      userId
    });
  }

  async findAddressByUserId(userId: string): Promise<AddressEntity[]> {
    const addresses = await this.addressRepository.find({
      where: {
        userId
      },
      relations: {
        city: {
          state: true
        }
      }
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException(` Address not found for userId: ${userId}`);
    }

    return addresses;
  }
}
