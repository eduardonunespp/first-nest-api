import { UserEntity } from '../entities';
import { UserType } from '../enum';

export const userEntityMock: UserEntity = {
  cpf: '20886209748',
  email: 'sim123@gmail.com',
  id: 1,
  name: 'Sim',
  password: '$2b$10$2gCmsjnObM/PzRo10qqdjudi9AuVt0eJDsYCm5iIUmfPgapotgh.K',
  phone: '238738',
  typeUser: UserType.User,
  addresses: [],
  createdAt: new Date(),
  updatedAt: new Date()
};
