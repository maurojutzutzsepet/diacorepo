import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadRoleDto } from 'src/modules/role/dtos/read-role.dto';
import { ReadUserDetailDto } from './read-user-details.dto';

export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsString()
  readonly cui: string;

  @Expose()
  @Type((type) => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type((type) => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
