import { Entity, Index, ManyToOne, OptionalProps, PrimaryKey, Property, Unique, BeforeUpdate, BeforeCreate } from '@mikro-orm/core';
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

  @Unique()
  @Property({ nullable: true })
  username?: string;

  @Unique()
  @Property({ nullable: true })
  email!: string;

  @Property({ nullable: true })
  password?: string;

  @ManyToOne({ entity: () => UserRoles, nullable: true })
  role?: UserRoles;

  @BeforeCreate()
  async beforeCreate(): Promise<void> {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
  async comparePassword(password: string): Promise<boolean> {
    if (this.password) {
      return await compare(password, this.password);
    }
    return false;
  }
  @ManyToOne({ entity: () => Zones, nullable: true })
  zone: Zones;
}
