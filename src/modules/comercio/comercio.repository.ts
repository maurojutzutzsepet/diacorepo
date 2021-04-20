import { EntityRepository, Repository } from 'typeorm';
import { Comercio } from './comercio.entity';

@EntityRepository(Comercio)
export class ComercioRepository extends Repository<Comercio> {}
