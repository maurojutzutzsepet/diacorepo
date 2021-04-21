import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class CrateQuejaDto {
  @IsString()
  @ApiProperty({ type: String, description: 'descripcion' })
  @MaxLength(250, { message: 'descripcion no valida' })
  readonly descripcion: string;

  @IsNumber()
  @ApiProperty({ type: String, description: 'nit' })
  readonly nit: string;

  @IsNumber()
  @ApiProperty({ type: String, description: 'user' })
  readonly user: string;
}
