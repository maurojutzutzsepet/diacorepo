import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'cui' })
  cui: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
