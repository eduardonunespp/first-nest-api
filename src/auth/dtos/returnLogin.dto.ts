import { returnUserDto } from 'src/user/dtos';

export class ReturnLoginDto {
  user: returnUserDto;
  accessToken: string;
}
