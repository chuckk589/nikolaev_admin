import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
  BeforeCreate,
  Collection,
  OneToMany,
  BeforeUpdate,
  EventArgs,
} from '@mikro-orm/core';
import { UserRoles } from './UserRoles';
import { compare, hash } from 'bcrypt';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Zones } from './Zones';

@Entity()
export class Users extends CustomBaseEntity {
  constructor(data: Partial<Users>) {
    super();
    Object.assign(this, data);
  }
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  name?: string;

  @Property({ nullable: true })
  surname?: string;

  @Property({ nullable: true })
  phone?: string;

  @Unique()
  @Property({ nullable: true })
  email!: string;

  @Property({ nullable: true })
  password?: string;

  @ManyToOne({ entity: () => UserRoles, nullable: true })
  role?: UserRoles;

  @OneToMany(() => Zones, (zone) => zone.user)
  zones = new Collection<Zones>(this);

  @BeforeCreate()
  async beforeCreate(): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
  @BeforeUpdate()
  async beforeUpdate(args: EventArgs<Users>): Promise<void> {
    if (args.changeSet.payload.password) {
      this.password = await hash(this.password, 10);
    }
  }
  async comparePassword(password: string): Promise<boolean> {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }
}
