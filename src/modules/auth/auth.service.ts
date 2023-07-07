import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../mikroorm/entities/Users';
import { AuthUser } from 'src/types/interfaces';
import { NewUserDto } from './dto/new-user.dto';
import { UserRoles } from '../mikroorm/entities/UserRoles';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly em: EntityManager) {}
  async reset(resetPasswordDto: ResetPasswordDto) {
    const existing = await this.em.findOne(Users, { email: resetPasswordDto.email });
    if (!existing) {
      throw new NotFoundException(`User with email ${resetPasswordDto.email} does not exist`);
    }
    const valid = await existing.comparePassword(resetPasswordDto.password);
    if (!valid) {
      throw new NotFoundException(`Incorrect password`);
    }
    existing.password = resetPasswordDto.newPassword;
    return await this.em.persistAndFlush(existing);
  }
  async signup(newUserDto: NewUserDto) {
    const existing = await this.em.findOne(Users, { email: newUserDto.email });
    if (existing) {
      throw new NotFoundException(`User with email ${newUserDto.email} already exists`);
    }
    const role = await this.em.findOneOrFail(UserRoles, { alias: 'user' });
    const user = wrap(new Users({ role })).assign(newUserDto);
    await this.em.persistAndFlush(user);
    return this.signin({ sub: user.id, role: user.role.alias, name: user.name, surname: user.surname });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.em.findOne(Users, { email }, { populate: ['role'] });
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
