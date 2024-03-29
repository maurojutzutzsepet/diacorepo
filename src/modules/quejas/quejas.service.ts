import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Comercio } from '../comercio/comercio.entity';
import { ComercioRepository } from '../comercio/comercio.repository';
import { ReadComercioDto } from '../comercio/dtos';
import { CrateQuejaDto, ReadQuejaDto, UpdateQuejaDto } from './dtos';
import { Queja } from './quejas.entity';
import { QuejaRespository } from './quejas.repository';

@Injectable()
export class QuejaService {
  constructor(
    private readonly _quejaRepository: QuejaRespository,
    private readonly _comercioRepository: ComercioRepository,
  ) {}

  async getAllQuejas(): Promise<ReadQuejaDto[]> {
    const quejas = await this._quejaRepository.find();

    return quejas.map((queja: Queja) => plainToClass(ReadQuejaDto, queja));
  }

  async getQuehaById(idQueja: number): Promise<ReadQuejaDto> {
    const queja = await this._quejaRepository.findOne(idQueja, {
      where: { status: 'ACTIVE' },
    });
    return plainToClass(ReadQuejaDto, queja);
  }

  async createQueja(queja: Partial<CrateQuejaDto>) {
    const { comercioId, descripcion } = queja;

    if (!comercioId) {
      throw new BadRequestException('no se envio id comercio');
    }
    const foundComercio = await this._comercioRepository.findOne(comercioId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundComercio) {
      throw new NotFoundException('No existe este comercio');
    }
    const saveQueja = new Queja();
    saveQueja.descripcion = descripcion;
    saveQueja.comercio = foundComercio;
    const quejaCreated = await this._quejaRepository.save(saveQueja);

    return plainToClass(ReadQuejaDto, quejaCreated);
  }

  async updateQueja(queja: Partial<UpdateQuejaDto>, idQueja: number) {
    const { comercioId, descripcion } = queja;

    if (!comercioId) {
      throw new BadRequestException('no se envio id comercio');
    }
    const foundComercio = await this._comercioRepository.findOne(comercioId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundComercio) {
      throw new NotFoundException('No existe este comercio');
    }

    const foundQueja = await this._quejaRepository.findOne(idQueja, {
      where: { status: 'ACTIVE' },
    });

    if (!foundQueja) {
      throw new NotFoundException('No existe esta queja');
    }

    foundQueja.descripcion = descripcion;
    foundQueja.comercio = foundComercio;

    const quejaUpdated = await this._quejaRepository.save(foundQueja);

    return plainToClass(ReadQuejaDto, quejaUpdated);
  }

  async getAllQuejasComercio(idComercio: number) {
    const comercio = await this._comercioRepository.findOne(idComercio, {
      where: { status: 'ACTIVE' },
      relations: ['quejas'],
    });
    return plainToClass(ReadComercioDto, comercio);
  }

  async getAllQuejasMunicipio(idMunicipio: number) {
    const comercios = await this._comercioRepository.find({
      where: { status: 'ACTIVE', municipio: idMunicipio },
      relations: ['quejas'],
    });
    return comercios.map((comercio: Comercio) =>
      plainToClass(ReadComercioDto, comercio),
    );
  }

  async getAllQuejasDepartamento(idDepartamento: number) {
    const comercios = await this._comercioRepository.find({
      where: { status: 'ACTIVE', departamento: idDepartamento },
      relations: ['quejas'],
    });
    return comercios.map((comercio: Comercio) =>
      plainToClass(ReadComercioDto, comercio),
    );
  }

  async getAllQuejasRegion(idRegion: number) {
    const comercios = await this._comercioRepository.find({
      where: { status: 'ACTIVE', region: idRegion },
      relations: ['quejas'],
    });
    return comercios.map((comercio: Comercio) =>
      plainToClass(ReadComercioDto, comercio),
    );
  }
}
