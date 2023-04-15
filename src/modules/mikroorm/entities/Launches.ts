import { Entity, Index, ManyToOne, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Games } from './Games';
import { Zones } from './Zones';

@Entity()
export class Launches {
  [OptionalProps]?: 'timestamp';

  @Index({ name: 'id' })
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Zones)
  zone: Zones;

  @ManyToOne(() => Games)
  game: Games;

  @Property({ columnType: 'timestamp', defaultRaw: `current_timestamp()` })
  timestamp!: Date;
}
