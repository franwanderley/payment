import { UUID } from 'crypto';
import { CreditCardDto } from './credit-card.dto';
import { BankSlipDto } from './bank-slip.dto';
import { InstantPayDto } from './instant-pay.dto';

export class CreateChargeDto {
  amount: number;
  currency: string;
  methodPay: 'credit_card' | 'bank_slip' | 'instant_payment';
  customerId: UUID;
  creditCard?: CreditCardDto;
  bankSlip?: BankSlipDto;
  instantPay?: InstantPayDto;
}
