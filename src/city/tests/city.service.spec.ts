import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../mocks/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock])
          }
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock)
          }
        }
      ]
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity)
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city findOne ', async () => {
    const city = await service.findCityById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('should return error findOne not found ', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should return Cities in getAllCitiesByStateId ', async () => {
    const city = await service.getAllCitiesByState(cityMock.id);

    expect(city).toEqual([cityMock]);
  });
});
