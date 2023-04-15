import { Entity, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Games {
  @Property({ columnType: 'text', length: 65535 })
  name!: string;

  @Index({ name: 'id' })
  @Unique({ name: 'id_2' })
  @PrimaryKey()
  id!: number;
}
