import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BankSlipDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Data de expiração do boleto' })
  expiration: Date;
}
