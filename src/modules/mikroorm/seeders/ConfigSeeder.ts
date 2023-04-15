import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserRoles } from '../entities/UserRoles';
import { Users } from '../entities/Users';

export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(UserRoles, {
      name: 'Модератор',
      alias: 'moderator',
    });
    em.create(UserRoles, {
      name: 'Администратор',
      alias: 'admin',
    });
    em.create(UserRoles, {
      name: 'Гость',
      alias: 'guest',
    });
    em.create(Users, {
      email: 'admin',
      username: 'admin',
      password: 'admin',
      role: em.getReference(UserRoles, 2),
    });
  }
}
