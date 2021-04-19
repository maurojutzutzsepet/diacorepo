import { EntityRepository, Repository } from 'typeorm';
import { Queja } from './quejas.entity';

@EntityRepository(Queja)
export class QuejaRespository extends Repository<Queja> {}
