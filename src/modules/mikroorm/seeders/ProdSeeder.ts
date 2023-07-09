import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserRoles } from '../entities/UserRoles';
import { Users } from '../entities/Users';
import { Games } from '../entities/Games';

export class ProdSeeder extends Seeder {
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
    games.forEach((game) => {
      em.create(Games, {
        name: game.name,
        alias: game.key,
        hideOnAdminPanel: game.hideOnAdminPanel || false,
      });
    });
  }
}

const games = [
  {
    key: 'mercs',
    name: 'Наёмники',
  },
  {
    key: 'stormsquad',
    name: 'Гром 1',
  },
  {
    key: 'stormsquad2',
    name: 'Гром 2',
  },
  {
    key: 'snow',
    name: 'Снежки',
  },
  {
    key: 'squeakycleaners',
    name: 'Чистюли',
  },
  {
    key: 'bounce',
    name: 'Баунсы',
  },
  {
    key: 'painball',
    name: 'Пэйнболл',
  },
  {
    key: 'fixies',
    name: 'fixies',
    hideOnAdminPanel: true,
  },
  {
    key: 'quest',
    name: 'quest',
    hideOnAdminPanel: true,
  },
  {
    key: 'host',
    name: 'host',
    hideOnAdminPanel: true,
  },
];
