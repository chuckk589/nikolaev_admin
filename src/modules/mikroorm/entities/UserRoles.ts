import { Entity, Index, OptionalProps, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class UserRoles {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias: string;

  @Property()
  name: string;
}
