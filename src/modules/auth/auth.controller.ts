import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto';

@ApiTags('Modulo de autorizacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @ApiBody({ type: SignupDTO })
  @UsePipes(ValidationPipe)
  async signup(@Body() signupDto: SignupDTO): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDTO) {
    return this._authService.signin(signinDto);
  }
}
