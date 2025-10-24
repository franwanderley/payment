import { UUID } from 'crypto';
import { Charge } from './charge.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credit_card')
export class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'integer', nullable: false })
  parcel: number;

  @Column({ type: 'numeric', nullable: false })
  parcelAmount: number;

  @OneToOne(() => Charge)
  charge: Charge;
}
