import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateAddressDto } from './dtos';
import { AddressService } from './address.service';
import { AddressEntity } from './entities';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body()
    createAddressDto: CreateAddressDto,
    @Param('userId')
    userId: string
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
