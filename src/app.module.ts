import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import ORMOptionsProvider from 'src/configs/mikro-orm.config';
import { StatusModule } from './modules/status/status.module';
import { ZonesModule } from './modules/zones/zones.module';
import { LaunchesModule } from './modules/launches/launches.module';
import { GamesModule } from './modules/games/games.module';

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
    StatusModule,
    AuthModule,
    ZonesModule,
    LaunchesModule,
    GamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
