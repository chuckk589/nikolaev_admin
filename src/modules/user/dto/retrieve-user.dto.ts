import { Users } from 'src/modules/mikroorm/entities/Users';

export class RetrieveUserDto {
  constructor(user: Partial<Users>) {
    this.id = user.id.toString();
    this.username = user.username;
    this.email = user.email;
    this.role = user.role.id.toString();
    this.createdAt = user.createdAt;
    this.zone = user.zone?.id.toString();
  }
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  zone: string;
}
