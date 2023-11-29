import { returnUserDto } from '../../user/dtos';

export class ReturnLoginDto {
  user: returnUserDto;
  accessToken: string;
}
