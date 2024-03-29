import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { getConnection } from 'typeorm';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { Role } from '../role/role.entity';
import { ReadUserDto, UpdateUserDto } from './dto';
import { UserDTO } from './dto/user.dto';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Modulo usuarios')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':userId')
  // @Roles('ADMIN', 'AGENTE')
  // @UseGuards(AuthGuard(), RoleGuard)
  async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ReadUserDto> {
    return this._userService.get(userId);
  }

  //@UseGuards(AuthGuard())
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  // @Post()
  // async createUser(@Body() user: User): Promise<User> {
  //   const details = new UserDetails();
  //   user.details = details;

  //   const repo = await getConnection().getRepository(Role);

  //   const defaultRole = await repo.findOne({ where: { nombre: 'GENERAL' } });
  //   user.roles = [defaultRole];
  //   const createdUser = await this._userService.create(user);
  //   return createdUser;
  // }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ): Promise<ReadUserDto> {
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this._userService.delete(userId);
  }

  @Post('setRole/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
