import { UUID } from 'crypto';

export type UpdateUserRequestDto = {
  id: UUID;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
