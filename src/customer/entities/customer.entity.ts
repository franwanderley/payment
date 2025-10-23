import { UUID } from 'crypto';
import { Charge } from 'src/charge/entities/charge.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 200, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  document: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  phone: string;

  @OneToMany(() => Charge, (charges) => charges.customer)
  charges: Charge[];
}
