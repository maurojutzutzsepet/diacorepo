import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<Role> {
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
    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles = await this._roleRepository.find({
      where: {
        status: 'ACTIVE',
      },
    });

    return roles;
  }

  async create(role: Role): Promise<Role> {
    const savedRole: Role = await this._roleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Role): Promise<any> {
    await this._roleRepository.update(id, role);
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
