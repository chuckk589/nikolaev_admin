import { RetrieveGameDto } from './dto/retrieve-game.dto';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Games } from '../mikroorm/entities/Games';

@Injectable()
export class GamesService {
  constructor(private readonly em: EntityManager) {}

  async findAll() {
    const games = await this.em.find(Games, { hideOnAdminPanel: false });
    return games.map((game) => new RetrieveGameDto(game));
  }
}
