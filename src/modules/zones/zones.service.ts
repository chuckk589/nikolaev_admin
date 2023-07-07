import { RetrieveZoneDto } from './dto/retrieve-zone.dto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Zones } from '../mikroorm/entities/Zones';
import { UpdateZoneAndUserDto } from './dto/update-zone-and-user.dto';

@Injectable()
export class ZonesService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<RetrieveZoneDto[]> {
    const zones = await this.em.find(Zones, {}, { populate: ['launches.game', 'user'] });
    return zones.map((zone) => new RetrieveZoneDto(zone));
  }
  async update(id: number, updateZoneAndUserDto: UpdateZoneAndUserDto) {
    const zone = await this.em.findOneOrFail(Zones, id, { populate: ['launches.game', 'user'] });
    zone.name = updateZoneAndUserDto.name || zone.name;
    if (zone.user) {
      zone.user.name = updateZoneAndUserDto.username || zone.user.name;
      zone.user.surname = updateZoneAndUserDto.surname || zone.user.surname;
      zone.user.email = updateZoneAndUserDto.email || zone.user.email;
      updateZoneAndUserDto.password && (zone.user.password = updateZoneAndUserDto.password);
    }
    await this.em.persistAndFlush(zone);
    return new RetrieveZoneDto(zone);
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }
}
