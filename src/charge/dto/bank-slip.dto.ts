import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class BankSlipDto {
  @ApiProperty({ description: 'Id da tabela(apenas para update)' })
  id?: UUID;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Data de expiração do boleto' })
  expiration: Date;
}
