import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ReadQuejaDto, ReadQuejaSimpleDto } from 'src/modules/quejas/dtos';
import { Queja } from 'src/modules/quejas/quejas.entity';

@Exclude()
export class ReadComercioDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'el nombre no es valido' })
  readonly nombre_comercio: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'el nit no es valido' })
  readonly nit: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly direccion: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly telefono: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly municipio: number;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly departamento: number;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly region: number;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly email: string;

  @Expose()
  @Type((type) => ReadQuejaDto)
  readonly quejas: ReadQuejaDto[];
}
