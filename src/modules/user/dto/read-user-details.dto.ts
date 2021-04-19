import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailDto {
  @Expose()
  @IsString()
  readonly primer_nombre: string;

  @Expose()
  @IsString()
  readonly segundo_nombre: string;
}
