import { EntityManager, MikroORM } from '@mikro-orm/core';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { Configs } from '../mikroorm/entities/Configs';
import { AppConfigService } from './app-config.service';
import { CONFIGS } from 'src/constants';

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {
  constructor(private readonly em: EntityManager) {}
  public static async forRootAsync(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    const ConfigProvider: Provider = {
      provide: CONFIGS,
      useFactory: async (orm: MikroORM) => {
        const configs = await orm.em.find(Configs, {});
        configs.map((config) => (process.env[config.name] = config.value));
        return {};
      },
      inject: [MikroORM],
    };
    return {
      module: AppConfigModule,
      imports: [ConfigModule.forRoot()],
      providers: [ConfigProvider],
      exports: [ConfigModule],
    };
  }
}
