import { ReturnStateDto } from 'src/state/dtos/returnState.dto';
import { CityEntity } from '../entities';

export class ReturnCityDto {
  name: string;
  state: ReturnStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}
