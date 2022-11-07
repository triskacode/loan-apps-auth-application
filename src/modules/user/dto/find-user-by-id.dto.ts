import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindUserByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
