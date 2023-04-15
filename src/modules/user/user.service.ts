import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Users } from '../mikroorm/entities/Users';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from '../mikroorm/entities/UserRoles';
import { Zones } from '../mikroorm/entities/Zones';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async update(user_id: number, body: UpdateUserDto) {
    const user = await this.em.findOneOrFail(Users, { id: user_id });
    user.email = body.email;
    user.role = this.em.getReference(UserRoles, +body.role);
    user.zone = this.em.getReference(Zones, +body.zone);
    await this.em.persistAndFlush(user);
    return new RetrieveUserDto(user);
  }

  async findAll() {
    const users = await this.em.find(Users, {}, { populate: ['role'] });
    return users.map((user) => new RetrieveUserDto(user));
  }
}
