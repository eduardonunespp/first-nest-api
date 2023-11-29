import {
  Body,
  Controller,
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

@Roles(UserType.User)
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
}
