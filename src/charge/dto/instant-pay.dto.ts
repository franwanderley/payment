import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InstantPayDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Chave para pagamento instantâneo (PIX)' })
  instantKey: string;
}
