import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';

@Module({
  imports: [],
  controllers: [],
  exports: [MapperService],
  providers: [MapperService],
})
export class SharedModule {}
