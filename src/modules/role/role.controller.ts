import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { getConnection } from 'typeorm';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ReadRoleDto } from './dtos/read-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@ApiTags('Modulo Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':roleId')
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    return this._roleService.get(roleId);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  @ApiBody({ type: CreateRoleDto })
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Put(':roleId')
  @ApiBody({ type: UpdateRoleDto })
  updateRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this._roleService.update(roleId, role);
  }

  @Delete(':roleId')
  async deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    await this._roleService.delete(roleId);
  }
}
