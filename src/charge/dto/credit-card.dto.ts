import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreditCardDto {
  @IsNotEmpty()
  @IsNumber()
  parcel: number;

  @IsNotEmpty()
  @IsNumber()
  parcelAmount: number;
}
