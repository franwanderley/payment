import { PartialType } from '@nestjs/mapped-types';
import { CreateChargeDto } from './create-charge.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateChargeDto extends PartialType(CreateChargeDto) {
  @IsNotEmpty()
  @IsEnum(['pending', 'payd', 'expired', 'failed'])
  status: 'pending' | 'payd' | 'expired' | 'failed';
}
