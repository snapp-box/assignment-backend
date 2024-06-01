import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly datastore: DataSource,
  ) {}

  finds(): Promise<User[] | null> {
    return this.usersRepository.find();
  }
  async findOneByEmail(email: string): Promise<any> {
    // direct to db
    // const d1 = await this.datastore.query('SELECT * FROM USER;');
    const d2 = this.datastore
      .getRepository('User')
      .createQueryBuilder()
      .select('User.id', 'id')
      .where({ email: email })
      .addSelect('User.password')
      .addSelect('User.id')
      .getOne();

    return d2;
  }

  findOneByEmailBase(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneById(id: UUID): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(userId: UUID, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }

  verifyUser(email: string, code: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: email,
        verify_code: code,
      },
    });
  }

  userApprove(email: string): Promise<UpdateResult> {
    return this.usersRepository.update(
      { email: email },
      {
        verify_code: '',
        status: 'approved',
      },
    );
  }

  isVerifiedUser(id: UUID): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        id: id,
        status: 'approved',
      },
    });
  }

  generateNewOtp(userId: UUID, newCode: string): Promise<UpdateResult> {
    return this.usersRepository.update(userId, {
      verify_code: newCode,
    });
  }
}
