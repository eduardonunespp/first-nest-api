import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @IsString()
  password: string;
}
