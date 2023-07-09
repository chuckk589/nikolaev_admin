import { Collection, Entity, Index, ManyToOne, OneToMany, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { Launches } from './Launches';
import { Users } from './Users';

@Entity()
export class Zones {
  [OptionalProps]?:
    | 'demoLaunchesCount'
    | 'demoMode'
    | 'hideOnAdminPanel'
    | 'lastConnectionTimestamp'
    | 'lastPlayedGame'
    | 'zoneDisabled'
    | 'zoneRegistered';

  @Index({ name: 'id' })
  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'text', length: 65535 })
  alias!: string;

  @Property({ columnType: 'text', length: 65535 })
  name!: string;

  @Property({ columnType: 'text', length: 65535 })
  zoneHardwareKey!: string;

  @Property({ columnType: 'text', length: 65535 })
  zoneStableHardwareKey!: string;

  @Property({ columnType: 'tinyint(3) unsigned', default: 0 })
  zoneRegistered = 0;

  @Property({ columnType: 'tinyint(1)', default: false })
  zoneDisabled = false;

  @Property({ columnType: 'timestamp', defaultRaw: `current_timestamp()` })
  lastConnectionTimestamp!: Date;

  @Property({ nullable: true, default: 0 })
  launchesCount?: number = 0;

  @Property({ columnType: 'tinyint(4)', default: -1 })
  lastPlayedGame = -1;

  @Property({ default: 0 })
  demoLaunchesCount: number;

  @Property({ default: 0 })
  demoMode: number;

  @Property({ columnType: 'tinyint(1)', default: false })
  hideOnAdminPanel = false;

  @Property({ columnType: 'tinyint(1)', default: false })
  markedAsDeleted = false;

  @OneToMany(() => Launches, (launch) => launch.zone)
  launches = new Collection<Launches>(this);

  @ManyToOne({ entity: () => Users, nullable: true })
  user: Users;
}
