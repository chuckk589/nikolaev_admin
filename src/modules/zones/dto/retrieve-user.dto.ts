import { Users } from 'src/modules/mikroorm/entities/Users';

export class RetrieveUserDto {
  constructor(user: Partial<Users>) {
    this.id = user.id.toString();
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.email = user.email;
  }
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}
