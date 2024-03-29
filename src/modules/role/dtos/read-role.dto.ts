import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'el nombre no es valido' })
  readonly nombre: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly descripcion: string;
}
