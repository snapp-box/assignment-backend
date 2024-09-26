import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Commission } from './commissions.entity';
import { UUID } from 'crypto';
import { CommissionRequestDto } from 'src/auth/dtos/commission-request.dto';
import * as MOCKED_DATA from './../database/statics.json';

@Injectable()
export class CommissionsService {
  constructor(
    @InjectRepository(Commission)
    private commissionsRepository: Repository<Commission>,
  ) {}

  findAll(): Promise<Commission[]> {
    return this.commissionsRepository.find();
  }

  findOne(id: UUID): Promise<Commission | null> {
    return this.commissionsRepository.findOneBy({ id });
  }

  create(body: CommissionRequestDto): Promise<Commission | null> {
    return this.commissionsRepository.save(body);
  }

  update(body: CommissionRequestDto): Promise<UpdateResult> {
    return this.commissionsRepository.update(body.id, {
      name: body.name,
      commission_normal: body.commission_normal,
      commission_promotion: body.commission_promotion,
    });
  }

  createBatch(body: CommissionRequestDto[]): Promise<Commission | null> {
    console.log('x-----', body);

    MOCKED_DATA.map((item) => {
      return this.commissionsRepository.save({
        name: item.name,
        commission_normal: item.commission_normal,
        commission_normal_new: item.commission_normal_new,
        commission_promotion: item.commission_promotion,
        commission_promotion_new: item.commission_promotion_new,
        parent_id: item.parent_id,
      });
    });
    return null;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.commissionsRepository.delete(id);
  }
}
