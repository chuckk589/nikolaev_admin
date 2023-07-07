import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserRoles } from '../entities/UserRoles';
import { Users } from '../entities/Users';
import { Games } from '../entities/Games';

export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(UserRoles, {
      name: 'Пользователь',
      alias: 'user',
    });
    em.create(UserRoles, {
      name: 'Главный администратор',
      alias: 'admin',
    });
    em.create(Users, {
      email: 'admin@admin.ru',
      password: 'adminadmin',
      role: em.getReference(UserRoles, 2),
    });
    ['bounce', 'stormsquad', 'fixies', 'snow', 'quest', 'host', 'painball', 'stormsquad2', 'squeakycleaners', 'mercs'].forEach(
      (alias, index) => {
        em.create(Games, {
          name: alias,
        });
      },
    );
  }
}
