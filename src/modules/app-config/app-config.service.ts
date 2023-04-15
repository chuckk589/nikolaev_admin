import { Controller, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGS } from 'src/constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService, @Inject(CONFIGS) any: any) {}
  get<T>(key: string, options?: any) {
    return this.configService.get<T>(key, options) || this.configService.get<T>(key.toUpperCase(), options);
  }
}
