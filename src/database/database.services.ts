import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConnectionOptions } from 'typeorm';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
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

// type: 'mssql' as 'mssql',
//         host: config.get(Configuration.HOST),
//         username: config.get(Configuration.USERNAME),
//         port: 1433,
//         password: config.get(Configuration.PASSWORD),
//         database: config.get(Configuration.DATABASE),
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         migrations: [__dirname + '/migrations/*{.ts,.js}'],
