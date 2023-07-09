import { OmitType } from '@nestjs/mapped-types';
import { Users } from 'src/modules/mikroorm/entities/Users';
import { CreateUserDto } from './create-user.dto';

export class RetrieveUserDto extends OmitType(CreateUserDto, ['password', 'zone'] as const) {
  constructor(user: Partial<Users>) {
    super();
    this.id = user.id.toString();
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.email = user.email;
  }
  id: string;
}
