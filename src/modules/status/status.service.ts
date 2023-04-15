import { EntityManager } from '@mikro-orm/core';
import { HttpException, Injectable, Res } from '@nestjs/common';
import { hash } from 'bcrypt';
import { RetrieveStatusDto } from './dto/retrieve-status.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { UserRoles } from '../mikroorm/entities/UserRoles';
import { Zones } from '../mikroorm/entities/Zones';

@Injectable()
export class StatusService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Record<string, RetrieveStatusDto[]>> {
    const roles = await this.em.find(UserRoles, {});
    const zones = await this.em.find(Zones, {});
    return {
      roles: roles.map((roles) => new RetrieveStatusDto({ title: roles.name, value: roles.id.toString() })),
      zones: [...new Set(zones.map((zone) => new RetrieveStatusDto({ title: zone.alias, value: zone.id.toString() })))],
    };
  }

  async updateConfig(id: number, updateConfigDto: UpdateConfigDto) {
    // const config = await this.em.findOneOrFail(Config, id);
    // if (config.name == 'ADMIN_PASSCODE') {
    //   updateConfigDto.value && (config.value = await hash(updateConfigDto.value, 10));
    // } else if (config.name == 'QUESTION_TIME') {
    //   const result = updateConfigDto.value.match(/^\d*-\d*$/);
    //   if (!result) throw new HttpException('Неверный формат времени', 400);
    //   config.value = updateConfigDto.value;
    // } else {
    //   updateConfigDto.value && (config.value = updateConfigDto.value);
    // }
    // updateConfigDto.description && (config.description = updateConfigDto.description);
    // await this.em.persistAndFlush(config);
    // return config;
  }
}
