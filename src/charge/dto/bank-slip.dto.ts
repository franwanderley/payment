import { IsDateString, IsNotEmpty } from 'class-validator';

export class BankSlipDto {
  @IsNotEmpty()
  @IsDateString()
  expiration: Date;
}
