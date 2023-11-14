import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';

@Module({
  providers: [CacheService],
  imports: [
    CacheModuleNest.register({
      ttl: 1000000000
    })
  ],
  exports: [CacheService]
})
export class CacheModule {}
