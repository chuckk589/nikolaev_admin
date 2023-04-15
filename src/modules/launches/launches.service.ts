import { RetrieveLaunchDto } from './dto/retrieve-launch.dto';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Launches } from '../mikroorm/entities/Launches';
import { AuthUser } from 'src/types/interfaces';

@Injectable()
export class LaunchesService {
  constructor(private readonly em: EntityManager) {}

  async findAll(user: AuthUser) {
    const options = user.role === 'admin' ? {} : { zone: { users: { id: user.sub } } };
    const launches = await this.em.find(Launches, options, { populate: ['zone', 'game'] });
    return launches.map((launch) => new RetrieveLaunchDto(launch));
  }
}
