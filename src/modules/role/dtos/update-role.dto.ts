import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'el nombre no es valido' })
  readonly nombre: string;

  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly descripcion: string;
}
