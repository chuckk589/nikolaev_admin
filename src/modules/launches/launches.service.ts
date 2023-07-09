import { Injectable } from '@nestjs/common';
import { RetrieveLaunchDto } from './dto/retrieve-launch.dto';
import { EntityManager, LoadStrategy } from '@mikro-orm/core';
import { Launches } from '../mikroorm/entities/Launches';
import { DateRangeDto } from './dto/date-range.dto';
import { AuthUser, LaunchesStats } from 'src/types/interfaces';
import { Users } from '../mikroorm/entities/Users';
import { FindZoneQueryDto } from './dto/find-zone-query.dto';

@Injectable()
export class LaunchesService {
  constructor(private readonly em: EntityManager) {}

  async findAll(dateRangeDto: DateRangeDto, user: AuthUser): Promise<LaunchesStats> {
    const whereOptions: any = {};
    if (user.role == 'user') {
      whereOptions.zone = { user: { id: user.sub } };
      if (dateRangeDto.zoneId) {
        whereOptions.zone = { id: +dateRangeDto.zoneId };
      }
    }
    if (dateRangeDto.gameId) {
      whereOptions.game = { id: +dateRangeDto.gameId };
    }
    dateRangeDto.startDate &&
      dateRangeDto.endDate &&
      (whereOptions.timestamp = { $gte: new Date(+dateRangeDto.startDate), $lte: new Date(+dateRangeDto.endDate) });
    const launches = await this.em.findAndCount(Launches, whereOptions);

    return {
      thisWeek: launches[0].filter((launch) => launch.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
      thisMonth: launches[0].filter((launch) => launch.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
      allTime: launches[1],
    };
  }

  async find(findZoneQueryDto: FindZoneQueryDto, user: AuthUser) {
    const whereOptions: any = {};
    const findOptions: any = {};
    findZoneQueryDto.zoneId && (whereOptions.zone = { id: +findZoneQueryDto.zoneId });
    if (findZoneQueryDto.lastNum) {
      findOptions.limit = +findZoneQueryDto.lastNum;
      findOptions.orderBy = { timestamp: 'DESC' };
    }
    if (user.role == 'user') {
      whereOptions.zone = whereOptions.zone || {};
      whereOptions.zone.user = { id: user.sub };
    }
    const launches = await this.em.find(Launches, whereOptions, { populate: ['game'], ...findOptions });
    return launches.map((launch) => new RetrieveLaunchDto(launch));
  }
}
