import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateComercioDto {
  @IsString()
  @MaxLength(50, { message: 'el nombre no es valido' })
  @ApiProperty({ type: String, description: 'nombre_comercio' })
  readonly nombre_comercio: string;

  @IsString()
  @MaxLength(20, { message: 'el telefono no es valida' })
  @ApiProperty({ type: String, description: 'telefono' })
  readonly telefono: string;

  @IsString()
  @MaxLength(250, { message: 'la direccion no es valida' })
  @ApiProperty({ type: String, description: 'direccion' })
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
