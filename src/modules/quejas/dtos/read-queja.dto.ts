import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ReadComercioDto } from '../../comercio/dtos/read-comercio.dto';

@Exclude()
export class ReadQuejaDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(200, { message: 'descripcion no valida' })
  readonly descripcion: string;

  @Expose()
  @Type((type) => ReadComercioDto)
  readonly comercio: ReadComercioDto;
}
