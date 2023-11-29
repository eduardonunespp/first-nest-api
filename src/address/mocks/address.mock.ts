import { userEntityMock } from '../../user/mocks';
import { AddressEntity } from '../entities';
import { cityMock } from '../../city/mocks/city.mock';

export const addressMock: AddressEntity = {
  cep: '0938333333',
  cityId: cityMock.id,
  complement: 'A',
  createdAt: new Date(),
  id: 10,
  updatedAt: new Date(),
  numberAddress: 20,
  userId: userEntityMock.id.toString(),
  city: undefined,
  user: undefined
};
