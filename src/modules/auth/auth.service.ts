import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { SigninDTO, SignupDTO } from './dto';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDTO): Promise<void> {
    const { cui, email } = signupDto;
    const userExist = await this._authRepository.findOne({
      where: [{ cui }, { email }],
    });

    if (userExist) {
      throw new ConflictException('cui o email ya existe');
    }

    return this._authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDTO): Promise<{ token: string }> {
    const { cui, password } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { cui },
    });

    if (!user) {
      throw new NotFoundException('usuario no existe');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('credenciales invalidas');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      cui: user.cui,
      roles: user.roles.map((r) => r.nombre as RoleType),
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
