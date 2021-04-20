import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { status } from '../../shared/entity-status.enum';
import { RoleRepository } from '../role/role.repository';
import { ReadUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.respository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,

    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadUserDto> {
    if (!id) {
      throw new BadRequestException('no se envio id');
    }
    const user = await this._userRepository.findOne(id, {
      where: {
        status: status.ACTIVE,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]> {
    const users = await this._userRepository.find({
      where: {
        status: status.ACTIVE,
      },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  // async create(user: User): Promise<User> {
  //   const savedUser: User = await this._userRepository.save(user);
  //   return savedUser;
  // }

  async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
    const foundUser = await this._userRepository.findOne(userId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundUser) {
      throw new NotFoundException('No existe este usuario');
    }

    foundUser.cui = user.cui;

    const updatedUser = await this._userRepository.save(foundUser);

    return plainToClass(ReadUserDto, updatedUser);
    //await this._userRepository.update(userId, user);
  }

  async delete(userId: number): Promise<any> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });
    if (!userExist) {
      throw new NotFoundException();
    }
    await this._userRepository.update(userId, { status: status.ACTIVE });
  }

  async setRoleToUser(userID: number, roleId: number): Promise<boolean> {
    const userExist = await this._userRepository.findOne(userID, {
      where: { status: status.ACTIVE },
    });
    if (!userExist) {
      throw new NotFoundException();
    }

    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });
    if (!roleExist) {
      throw new NotFoundException('Rol no existe');
    }

    userExist.roles.push(roleExist);

    await this._userRepository.save(userExist);

    return true;
  }
}
