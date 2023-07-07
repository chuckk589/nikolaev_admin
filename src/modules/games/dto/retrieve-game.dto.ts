import { Games } from 'src/modules/mikroorm/entities/Games';

export class RetrieveGameDto {
  constructor(game: Partial<Games>) {
    this.id = game.id.toString();
    this.name = game.name;
  }
  id: string;
  name: string;
}
