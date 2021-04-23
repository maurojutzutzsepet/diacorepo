import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ComercioService } from './comercio.service';
import { CreateComercioDto, ReadComercioDto, UpdateComercioDto } from './dtos';

@ApiTags('Modulo Comercio')
@Controller('comercio')
export class ComercioController {
  constructor(private readonly _comercioService: ComercioService) {}

  @Get()
  getAllComercios(
    @Query('includeQuejas', ParseBoolPipe) includeQuejas: boolean,
  ): Promise<ReadComercioDto[]> {
    return this._comercioService.getAllComercio(includeQuejas);
  }

  @Get(':idComercio')
  getComercioById(
    @Param('idComercio', ParseIntPipe) idComercio: number,
  ): Promise<ReadComercioDto> {
    return this._comercioService.getComercioById(idComercio);
  }

  @Get('/nit/:nit')
  getComercioByNit(@Param('nit') nit: string): Promise<ReadComercioDto> {
    return this._comercioService.getComercioByNit(nit);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Registro de comercios' })
  @ApiBody({ type: CreateComercioDto })
  createComercio(
    @Body() comercio: CreateComercioDto,
  ): Promise<ReadComercioDto> {
    return this._comercioService.createComercio(comercio);
  }

  @Put(':idComercio')
  @ApiBody({ type: UpdateComercioDto })
  updateComercio(
    @Param('idComercio', ParseIntPipe) idComercio: number,
    @Body() comercio: Partial<UpdateComercioDto>,
  ): Promise<ReadComercioDto> {
    return this._comercioService.updateComercio(idComercio, comercio);
  }

  @Delete(':idComercio')
  deleteComercio(
    @Param('idComercio', ParseIntPipe) idComercio: number,
  ): Promise<any> {
    return this._comercioService.deleteComercio(idComercio);
  }
}
