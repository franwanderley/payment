import { PartialType } from '@nestjs/swagger';
import { CreateChargeDto } from './create-charge.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChargeDto extends PartialType(CreateChargeDto) {
  @IsNotEmpty()
  @IsEnum(['pending', 'payd', 'expired', 'failed'])
  @ApiProperty({
    enum: ['pending', 'payd', 'expired', 'failed'],
    description: 'Status da cobrança',
  })
  status: 'pending' | 'payd' | 'expired' | 'failed';
}
