import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type UserStatus = null | 'approved';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  verify_code?: string;

  @Column({ nullable: true })
  status?: UserStatus;
}
