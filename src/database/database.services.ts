import { TypeOrmModule } from '@nestjs/typeorm';
//import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';
//import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [],
    async useFactory() {
      return {
        ssl: false,
        type: 'mssql' as 'mssql',
        host: '104.154.189.53',
        username: 'mjsusuario1',
        port: 1433,
        password: 'agudevdiaco1234',
        database: 'testdb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
