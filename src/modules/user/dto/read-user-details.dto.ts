import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly primer_nombre: string;

  @Expose()
  @IsString()
  readonly segundo_nombre: string;

  @Expose()
  @IsString()
  readonly primer_apellido: string;

  @Expose()
  @IsString()
  readonly segundo_apellido: string;
}
