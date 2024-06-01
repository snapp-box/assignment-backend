import { UUID } from 'crypto';

export type CommissionRequestDto = {
  id?: UUID;
  name: string;
  commission_normal: number;
  commission_normal_new: number;
  commission_promotion: number;
  commission_promotion_new: number;
  parent_id: number;
};
