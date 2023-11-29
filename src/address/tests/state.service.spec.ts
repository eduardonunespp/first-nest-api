import { Test, TestingModule } from '@nestjs/testing';
import { AddressEntity } from '../entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { addressMock } from '../mocks/address.mock';
import { AddressService } from '../address.service';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/mocks';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/mocks/city.mock';
import { createAddressMock } from '../mocks';

describe('AddressService', () => {
  let service: AddressService;
  let cityService: CityService;
  let userService: UserService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock)
          }
        },
        {
          provide: CityService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(cityMock)
          }
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock)
          }
        }
      ]
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity)
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return address after save', async () => {
    const address = await service.createAddress(
      createAddressMock,
      addressMock.id.toString()
    );

    expect(address).toEqual(addressMock);
  });

  // it('should return error if exception in userService', async () => {
  //   jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.createAddress(createAddressMock, userEntityMock.id.toString())
  //   ).rejects.toThrowError();
  // });

  // it('should return error if exception in cityService', async () => {
  //   jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.createAddress(createAddressMock, userEntityMock.id.toString())
  //   ).rejects.toThrowError();
  // });
});
