import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReadComercioDto } from '../comercio/dtos';
import { CrateQuejaDto, ReadQuejaDto, UpdateQuejaDto } from './dtos';
import { QuejaService } from './quejas.service';

@ApiTags('Modulo quejas')
@Controller('quejas')
export class QuejasControlle {
  constructor(private readonly _quejasService: QuejaService) {}

  @Post()
  @ApiBody({ type: CrateQuejaDto })
  createQueja(@Body() queja: CrateQuejaDto): Promise<ReadQuejaDto> {
    return this._quejasService.createQueja(queja);
  }

  @Get()
  getAllQuejas(): Promise<ReadQuejaDto[]> {
    return this._quejasService.getAllQuejas();
  }

  @Get('/user/:cui')
  getAllQuejasByCui(@Param('cui') cui: string): Promise<ReadQuejaDto[]> {
    return this._quejasService.getAllQuejasByCui(cui);
  }

  @Get(':idQueja')
  getQuejaById(
    @Param('idQueja', ParseIntPipe) idQueja: number,
  ): Promise<ReadQuejaDto> {
    return this._quejasService.getQuehaById(idQueja);
  }

  @Get('/comercio/:idComercio')
  getAllQuejasComercio(
    @Param('idComercio', ParseIntPipe) idComercio: number,
  ): Promise<ReadComercioDto> {
    return this._quejasService.getAllQuejasComercio(idComercio);
  }

  @Get('/comercio/nit/:nit')
  getAllQuejasComercioNit(
    @Param('nit') nit: string,
  ): Promise<ReadComercioDto[]> {
    return this._quejasService.getQuejasByNit(nit);
  }

  @Get('/comercio/municipio/:idMunicipio')
  getAllQuejasMunicipio(
    @Param('idMunicipio', ParseIntPipe) idMunicipio: number,
  ): Promise<ReadComercioDto[]> {
    return this._quejasService.getAllQuejasMunicipio(idMunicipio);
  }

  @Get('/comercio/departamento/:idDepartamento')
  getAllQuejasDepartamento(
    @Param('idDepartamento', ParseIntPipe) idDepartamento: number,
  ): Promise<ReadComercioDto[]> {
    return this._quejasService.getAllQuejasDepartamento(idDepartamento);
  }

  @Get('/comercio/region/:idRegion')
  getAllQuejasRegion(
    @Param('idRegion', ParseIntPipe) idRegion: number,
  ): Promise<ReadComercioDto[]> {
    return this._quejasService.getAllQuejasRegion(idRegion);
  }

  @Put(':idQueja')
  @ApiBody({ type: UpdateQuejaDto })
  updateQueja(
    @Param('idQueja', ParseIntPipe) idQueja: number,
    @Body() queja: UpdateQuejaDto,
  ): Promise<ReadQuejaDto> {
    return this._quejasService.updateQueja(queja, idQueja);
  }

  @Delete(':idQueja')
  deleteQueja(@Param('idQueja', ParseIntPipe) idQueja: number): Promise<any> {
    return this._quejasService.deleteQuejaById(idQueja);
  }
}
