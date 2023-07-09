import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../mikroorm/entities/Users';
import { EntityManager } from '@mikro-orm/core';
import { Zones } from '../mikroorm/entities/Zones';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UserRoles } from '../mikroorm/entities/UserRoles';
import { AuthUser } from 'src/types/interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(createUserDto: CreateUserDto): Promise<RetrieveUserDto & { usedZone: string }> {
    const { zone, ...userDto } = createUserDto;
    const user = this.em.create(Users, userDto);
    const userRole = await this.em.findOneOrFail(UserRoles, { alias: 'user' });
    user.zones.add(this.em.getReference(Zones, +zone));
    user.role = userRole;
    await this.em.persistAndFlush(user);
    return { ...new RetrieveUserDto(user), usedZone: zone };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(updateUserDto: UpdateUserDto, user: AuthUser): Promise<RetrieveUserDto> {
    const existingUser = await this.em.findOneOrFail(Users, user.sub);
    updateUserDto.name && (existingUser.name = updateUserDto.name);
    updateUserDto.email && (existingUser.email = updateUserDto.email);
    updateUserDto.phone && (existingUser.phone = updateUserDto.phone);
    if (updateUserDto.password) {
      const valid = await existingUser.comparePassword(updateUserDto.oldPassword);
      if (!valid) {
        throw new HttpException('Invalid password', 400);
      }
      existingUser.password = updateUserDto.password;
    }
    await this.em.persistAndFlush(existingUser);
    return new RetrieveUserDto(existingUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
