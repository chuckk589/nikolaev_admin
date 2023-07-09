import { Entity, Index, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Games {
  @Property({ columnType: 'text', length: 65535 })
  name!: string;

  @Property({ columnType: 'text', length: 65535 })
  alias!: string;

  @Property({ columnType: 'tinyint(1)', default: false })
  hideOnAdminPanel = false;

  @Index({ name: 'id' })
  @PrimaryKey()
  id!: number;
}
