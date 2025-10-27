import { UUID } from 'crypto';
import { CreditCardDto } from './credit-card.dto';
import { BankSlipDto } from './bank-slip.dto';
import { InstantPayDto } from './instant-pay.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ example: 100.5, description: 'Valor da cobrança' })
  amount: number;

  @MaxLength(3)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'BRL', description: 'Moeda da cobrança (ISO 4217)' })
  currency: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['credit_card', 'bank_slip', 'instant_payment'])
  @ApiProperty({
    enum: ['credit_card', 'bank_slip', 'instant_payment'],
    description: 'Método de pagamento',
  })
  methodPay: 'credit_card' | 'bank_slip' | 'instant_payment';

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    description: 'ID do cliente',
  })
  customerId: UUID;

  @ApiPropertyOptional({ description: 'Dados do cartão de crédito' })
  creditCard?: CreditCardDto;

  @ApiPropertyOptional({ description: 'Dados do boleto bancário' })
  bankSlip?: BankSlipDto;

  @ApiPropertyOptional({ description: 'Dados do pagamento instantâneo(PIX)' })
  instantPay?: InstantPayDto;
}
