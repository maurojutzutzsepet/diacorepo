import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly primer_nombre: string;

  @IsString()
  readonly cui: string;
}
