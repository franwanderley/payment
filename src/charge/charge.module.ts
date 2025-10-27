import { Module } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { ChargeController } from './charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charge } from './entities/charge.entity';
import { CreditCard } from './entities/credit-card.entity';
import { bankSlip } from './entities/bank-slip.entity';
import { InstantPay } from './entities/instant-pay.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { IdempotencyInterceptor } from '../idempotency.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Charge,
      CreditCard,
      bankSlip,
      InstantPay,
      Customer,
    ]),
  ],
  controllers: [ChargeController],
  providers: [ChargeService, IdempotencyInterceptor],
})
export class ChargeModule {}
