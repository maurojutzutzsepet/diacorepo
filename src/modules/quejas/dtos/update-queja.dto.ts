import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class UpdateQuejaDto {
  @IsString()
  @MaxLength(250, { message: 'descripcion no valida' })
  @ApiProperty({ type: String, description: 'descripcion' })
  readonly descripcion: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'comercioId' })
  readonly comercioId: number;
}
