import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class InstantPayDto {
  @ApiProperty({ description: 'Id da tabela(apenas para update)' })
  id?: UUID;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Chave para pagamento instantâneo (PIX)' })
  instantKey: string;
}
