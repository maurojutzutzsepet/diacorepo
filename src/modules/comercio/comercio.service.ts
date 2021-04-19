import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Comercio } from './comercio.entity';
import { ComercioRepository } from './comercio.repository';
import { CreateComercioDto, ReadComercioDto, UpdateComercioDto } from './dtos';

@Injectable()
export class ComercioService {
  constructor(
    @InjectRepository(ComercioRepository)
    private readonly _comercioRepository: ComercioRepository,
  ) {}

  async getAllComercio(includeQuejas: boolean) {
    let include;

    if (includeQuejas) {
      include = {
        where: { status: 'ACTIVE' },
        relations: ['quejas'],
      };
    } else {
      include = {
        where: { status: 'ACTIVE' },
      };
    }

    const comercios = await this._comercioRepository.find(include);

    return comercios.map((comercio: Comercio) =>
      plainToClass(ReadComercioDto, comercio),
    );
  }

  async getComercioById(comercioId: number) {
    const comercio = await this._comercioRepository.findOne(comercioId, {
      where: { status: 'ACTIVE' },
    });

    return comercio;
  }

  async createComercio(
    comercio: Partial<CreateComercioDto>,
  ): Promise<ReadComercioDto> {
    const comercioCreated: Comercio = await this._comercioRepository.save(
      comercio,
    );
    return plainToClass(ReadComercioDto, comercioCreated);
  }

  async updateComercio(
    idComercio: number,
    comercio: Partial<UpdateComercioDto>,
  ): Promise<ReadComercioDto> {
    const foundComercio: Comercio = await this._comercioRepository.findOne(
      idComercio,
      { where: { status: 'ACTIVE' } },
    );

    if (!foundComercio) {
      throw new NotFoundException('Este comercio no existe');
    }

    foundComercio.nombre_comercio = comercio.nombre_comercio;
    foundComercio.telefono = comercio.telefono;
    foundComercio.departamento = comercio.departamento;
    foundComercio.direccion = comercio.direccion;
    foundComercio.municipio = comercio.municipio;
    //foundComercio.status = comercio.municipio;
    foundComercio.email = comercio.email;
    foundComercio.region = comercio.region;

    const updatedComercio = await this._comercioRepository.save(foundComercio);

    return plainToClass(ReadComercioDto, updatedComercio);
  }

  //   async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
  //     const savedRole: Role = await this._roleRepository.save(role);
  //     return plainToClass(ReadRoleDto, savedRole);
  //   }

  async deleteComercio(idComercio: number): Promise<any> {
    const comercioExist = await this._comercioRepository.findOne(idComercio, {
      where: { status: 'ACTIVE' },
    });
    if (!comercioExist) {
      throw new NotFoundException();
    }
    await this._comercioRepository.update(idComercio, { status: 'INACTIVE' });
  }
}
