import { UUID } from 'crypto';
import { CreditCardDto } from './credit-card.dto';
import { BankSlipDto } from './bank-slip.dto';
import { InstantPayDto } from './instant-pay.dto';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @MaxLength(3)
  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['credit_card', 'bank_slip', 'instant_payment'])
  methodPay: 'credit_card' | 'bank_slip' | 'instant_payment';

  @IsNotEmpty()
  @IsUUID()
  customerId: UUID;

  creditCard?: CreditCardDto;
  bankSlip?: BankSlipDto;
  instantPay?: InstantPayDto;
}
