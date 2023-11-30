import { userEntityMock } from '../../user/mocks';
import { LoginDto } from '../dtos';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '12345678'
};
