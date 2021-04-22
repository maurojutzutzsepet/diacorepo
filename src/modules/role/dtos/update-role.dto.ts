import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @ApiProperty({ type: String, description: 'nombre' })
  @MaxLength(50, { message: 'el nombre no es valido' })
  readonly nombre: string;

  @IsString()
  @ApiProperty({ type: String, description: 'descripcion' })
  @MaxLength(100, { message: 'la descripcion no es valido' })
  readonly descripcion: string;
}
