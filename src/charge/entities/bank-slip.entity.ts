import { UUID } from 'crypto';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Charge } from './charge.entity';

@Entity('bank_slip')
export class bankSlip {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'timestamp', nullable: false })
  expiration: Date;

  @OneToOne(() => Charge)
  charge: Charge;
}
