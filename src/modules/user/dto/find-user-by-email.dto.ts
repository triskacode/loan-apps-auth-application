import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
