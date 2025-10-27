import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class CreditCardDto {
  @ApiProperty({ description: 'Id da tabela(apenas para update)' })
  id?: UUID;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 3, description: 'Número de parcelas' })
  parcel: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 33.5, description: 'Valor de cada parcela' })
  parcelAmount: number;
}
