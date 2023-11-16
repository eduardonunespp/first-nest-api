import { AddressEntity } from '../entities';

export class ReturnAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: number;

  constructor(address: AddressEntity) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
  }
}
