import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'commission' })
export class Commission {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column({ nullable: true })
  name: string;

  @Column()
  commission_normal: number;

  @Column({ nullable: true })
  commission_normal_new: number;

  @Column()
  commission_promotion: number;

  @Column({ nullable: true })
  commission_promotion_new: number;

  @Column({ nullable: true })
  parent_id?: number;
}
