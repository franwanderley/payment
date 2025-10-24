import { UUID } from 'crypto';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({ type: 'varchar', length: 20, nullable: false, default: 'pending' })
  status: 'pending' | 'payd' | 'expired' | 'failed';

  @Column({ type: 'varchar', length: 20 })
  methodPay: 'credit_card' | 'bank_slip' | 'instant_pay';

  @ManyToOne(() => Customer, (customer) => customer.charges)
  customer: Customer;

  @OneToOne(() => bankSlip, { cascade: true })
  @JoinColumn()
  bankSlip: bankSlip;

  @OneToOne(() => CreditCard, { cascade: true })
  @JoinColumn()
  creditCard: CreditCard;

  @OneToOne(() => InstantPay, { cascade: true })
  @JoinColumn()
  instantPay: InstantPay;
}
