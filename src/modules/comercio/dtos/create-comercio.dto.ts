import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateComercioDto {
  @IsString()
  @ApiProperty({ type: String, description: 'nombre_comercio' })
  @MaxLength(50, { message: 'el nombre no es valido' })
  readonly nombre_comercio: string;

  @ApiProperty({ type: String, description: 'nit' })
  @MaxLength(50, { message: 'el nit no es valido' })
  readonly nit: string;

  @IsString()
  @ApiProperty({ type: String, description: 'telefono' })
  @MaxLength(20, { message: 'el telefono no es valida' })
  readonly telefono: string;

  @IsString()
  @ApiProperty({ type: String, description: 'direccion' })
  @MaxLength(80, { message: 'la direccion no es valida' })
  readonly direccion: string;

  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  readonly email: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'municipio' })
  readonly municipio: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'departamento' })
  readonly departamento: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'region' })
  readonly region: number;
}
