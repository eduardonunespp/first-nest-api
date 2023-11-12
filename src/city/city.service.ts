import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>
  ) {}

  async getAllCitiesByState(stateId: number): Promise<CityEntity[]> {
    const citiesCache: CityEntity[] = await this.cacheManager.get(`${stateId}`);

    if (citiesCache) {
      return citiesCache;
    }

    const cities = await this.cityRepository.find({
      where: {
        stateId
      }
    });

    await this.cacheManager.set(`${stateId}`, cities);

    return cities;
  }
}
