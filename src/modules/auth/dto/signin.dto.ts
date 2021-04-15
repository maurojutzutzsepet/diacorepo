import { IsNotEmpty, IsString } from 'class-validator';
export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  cui: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
