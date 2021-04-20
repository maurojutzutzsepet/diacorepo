import { Module } from '@nestjs/common';
//import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { ComercioModule } from './modules/comercio/comercio.module';
import { QuejasModule } from './modules/quejas/quejas.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //ConfigModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    AuthModule,
    ComercioModule,
    QuejasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
