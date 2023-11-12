import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entities';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number
  ): Promise<CityEntity[]> {
    return this.cityService.getAllCitiesByState(stateId);
  }
}
