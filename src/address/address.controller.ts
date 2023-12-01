import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateAddressDto } from './dtos';
import { AddressService } from './address.service';
import { AddressEntity } from './entities';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum';
import { UserId } from '../decorators';
import { ReturnAddressDto } from './dtos/returnAddress.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body()
    createAddressDto: CreateAddressDto,
    @UserId()
    userId: string
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  @UsePipes(ValidationPipe)
  async findAddressByUserId(
    @UserId()
    userId: string
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new ReturnAddressDto(address)
    );
  }
}
