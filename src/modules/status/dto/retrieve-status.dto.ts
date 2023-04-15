import { Users } from 'src/modules/mikroorm/entities/Users';

export class RetrieveStatusDto {
  constructor(init?: Partial<RetrieveStatusDto>) {
    Object.assign(this, init);
  }
  title: string; //name of config
  value: string; //id of config
  comment?: string;
}
