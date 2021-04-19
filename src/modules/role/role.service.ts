import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ReadRoleDto } from './dtos/read-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('no se envio id');
    }
    const role = await this._roleRepository.findOne(id, {
      where: {
        status: 'ACTIVE',
      },
    });
    if (!role) {
      throw new NotFoundException();
    }
    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles = await this._roleRepository.find({
      where: {
        status: 'ACTIVE',
      },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(
    roleId: number,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole = await this._roleRepository.findOne(roleId, {
      where: { status: 'ACTIVE' },
    });
    if (!foundRole) {
      throw new NotFoundException('Este rol no existe');
    }

    foundRole.nombre = role.nombre;
    foundRole.descripcion = role.descripcion;

    const updateRole: Role = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(id: number): Promise<any> {
    const roleExist = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!roleExist) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
