import { UUID } from 'crypto';
import { Charge } from './charge.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instant_pay')
export class InstantPay {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 100, nullable: false })
  instantKey: string;

  @OneToOne(() => Charge)
  charge: Charge;
}
