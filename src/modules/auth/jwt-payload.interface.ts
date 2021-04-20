import { RoleType } from '../role/roletype.enum';

export interface IJwtPayload {
  id: number;
  cui: string;
  email: string;
  roles: RoleType[];
  iat?: Date;
}
