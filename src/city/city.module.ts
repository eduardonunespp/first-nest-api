import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [CityController],
  imports: [
    CacheModule.register({
      ttl: 1000000000
    }),
    TypeOrmModule.forFeature([CityEntity])
  ],
  providers: [CityService]
})
export class CityModule {}
