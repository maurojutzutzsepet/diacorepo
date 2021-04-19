import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadQuejaSimpleDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(200, { message: 'descripcion no valida' })
  readonly descripcion: string;
}
