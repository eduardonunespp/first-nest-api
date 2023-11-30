import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/mocks';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../mocks';
import { loginUserMock } from '../mocks';
import { returnUserDto } from '../../user/dtos';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valided', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new returnUserDto(userEntityMock)
    });
  });

  it('should return user if password invalid and email valid', async () => {
    expect(
      service.login({ ...loginUserMock, password: '1234' })
    ).rejects.toThrowError();
  });

  it('should return user if password invalid and email valid', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in userService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
