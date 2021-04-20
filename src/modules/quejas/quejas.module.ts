import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComercioRepository } from '../comercio/comercio.repository';
import { QuejasControlle } from './quejas.controller';
import { QuejaRespository } from './quejas.repository';
import { QuejaService } from './quejas.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuejaRespository, ComercioRepository])],
  providers: [QuejaService],
  controllers: [QuejasControlle],
})
export class QuejasModule {}
