import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../mikroorm/entities/Users';
import { AuthUser } from 'src/types/interfaces';
import { NewUserDto } from './dto/new-user.dto';
import { UserRoles } from '../mikroorm/entities/UserRoles';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly em: EntityManager) {}

  async signup(newUserDto: NewUserDto) {
    const existing = await this.em.findOne(Users, { $or: [{ username: newUserDto.username }, { email: newUserDto.email }] });
    if (existing) {
      throw new NotFoundException(`${existing.username === newUserDto.username ? 'Username' : 'Email'} is already taken`);
    }
    const role = await this.em.findOneOrFail(UserRoles, { alias: 'guest' });
    const user = wrap(new Users({ role })).assign(newUserDto);
    await this.em.persistAndFlush(user);
    return this.signin({ sub: user.id, role: user.role.alias });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.em.findOne(Users, { username }, { populate: ['role'] });
    if (user && (await user.comparePassword(password))) {
      return user;
    }
    return null;
  }

  async signin(user: AuthUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
