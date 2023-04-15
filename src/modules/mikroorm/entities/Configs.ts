import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum ConfigType {
  SELECT = 'select',
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  PASSWORD = 'password',
}

@Entity()
export class Configs {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property({ length: 255, nullable: true })
  name?: string;

  @Property({ length: 512, nullable: true })
  value?: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @Enum({ items: () => ConfigType, default: ConfigType.INPUT })
  type?: ConfigType;
}
