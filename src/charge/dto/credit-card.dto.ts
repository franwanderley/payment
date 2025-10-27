import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreditCardDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 3, description: 'Número de parcelas' })
  parcel: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 33.5, description: 'Valor de cada parcela' })
  parcelAmount: number;
}
