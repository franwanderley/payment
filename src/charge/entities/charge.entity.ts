import { UUID } from 'crypto';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { bankSlip } from './bank-slip.entity';
import { CreditCard } from './credit-card.entity';
import { InstantPay } from './instant-pay.entity';

@Entity('charges')
export class Charge {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'numeric', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 3, nullable: false })
  currency: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  status: 'pending' | 'payd' | 'expired' | 'failed';

  @Column({ type: 'varchar', length: 20, nullable: false, default: 'pending' })
  methodPay: 'credit_card' | 'bank_slip' | 'instant_pay';

  @ManyToOne(() => Customer, (customers) => customers.id)
  customer: Customer;

  @OneToOne(() => bankSlip, { cascade: true })
  bankSlip: bankSlip;

  @OneToOne(() => CreditCard, { cascade: true })
  creditCard: CreditCard;

  @OneToOne(() => InstantPay, { cascade: true })
  instantPay: InstantPay;
}
