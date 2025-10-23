import { PartialType } from '@nestjs/mapped-types';
import { CreateChargeDto } from './create-charge.dto';
import { CreditCardDto } from './credit-card.dto';
import { BankSlipDto } from './bank-slip.dto';
import { InstantPayDto } from './instant-pay.dto';

export class UpdateChargeDto extends PartialType(CreateChargeDto) {
  status: 'pending' | 'payd' | 'expired' | 'failed';
  creditCard?: CreditCardDto;
  bankSlip?: BankSlipDto;
  instantPay?: InstantPayDto;
}
