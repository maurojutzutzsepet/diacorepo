import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'primer_nombre' })
  readonly primer_nombre: string;

  @IsString()
  @ApiProperty({ type: String, description: 'cui' })
  readonly cui: string;
}
