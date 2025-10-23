import { UUID } from 'crypto';

export class CreateChargeDto {
  amount: number;
  currency: string;
  methodPay: 'credit_card' | 'bank_slip' | 'instant_payment';
  customerId: UUID;
}
