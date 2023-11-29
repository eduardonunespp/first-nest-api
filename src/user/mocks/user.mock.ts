import { UserEntity } from '../entities';
import { UserType } from '../enum';

export const userEntityMock: UserEntity = {
  cpf: '20886209748',
  email: 'sim@gmail.com',
  id: 1,
  name: 'Sim',
  password: '2232323443',
  phone: '238738',
  typeUser: UserType.User,
  addresses: [],
  createdAt: new Date(),
  updatedAt: new Date()
};
