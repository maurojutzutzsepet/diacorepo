import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComercioController } from './comercio.controller';
import { ComercioRepository } from './comercio.repository';
import { ComercioService } from './comercio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComercioRepository])],
  providers: [ComercioService],
  controllers: [ComercioController],
})
export class ComercioModule {}
