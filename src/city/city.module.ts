import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities';
import { CacheModule } from '../cache';

@Module({
  controllers: [CityController],
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule],
  providers: [CityService]
})
export class CityModule {}
