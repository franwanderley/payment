import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
