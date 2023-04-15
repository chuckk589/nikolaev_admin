import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { MikroORM } from '@mikro-orm/core';
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import ORMOptionsProvider from 'src/configs/mikro-orm.config';
import { StatusModule } from './modules/status/status.module';
import { LaunchesModule } from './modules/launches/launches.module';

@Module({
  imports: [
    AppConfigModule.forRootAsync(),
    MikroOrmModule.forRoot(ORMOptionsProvider),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        quietReqLogger: true,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },

        level: 'info',
      },
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', '/dist/public/') }),
    UserModule,
    StatusModule,
    AuthModule,
    LaunchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
