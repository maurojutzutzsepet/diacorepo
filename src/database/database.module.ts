import { Module } from '@nestjs/common';
import { databaseProvider } from './database.services';

@Module({
  imports: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
