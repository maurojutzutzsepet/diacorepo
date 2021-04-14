import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDTO } from './dto/user.dto';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDTO> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    const user = await this._userService.getAll();
    return user;
  }

  @Post()
  async createUser(@Body() user: User): Promise<UserDTO> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);

    const defaultRole = await repo.findOne({ where: { nombre: 'GENERAL' } });
    user.roles = [defaultRole];
    const createdUser = await this._userService.create(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<UserDTO> {
    const updateUser = await this._userService.update(id, user);
    return updateUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._userService.delete(id);
  }
}
