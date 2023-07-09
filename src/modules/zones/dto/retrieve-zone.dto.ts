import { RetrieveUserDto } from '../../users/dto/retrieve-user.dto';
import { RetrieveLaunchDto } from 'src/modules/launches/dto/retrieve-launch.dto';
import { Zones } from 'src/modules/mikroorm/entities/Zones';

export class RetrieveZoneDto {
  constructor(zone: Partial<Zones>) {
    this.id = zone.id.toString();
    this.name = zone.name;
    this.launches = zone.launches.getItems().map((launch) => new RetrieveLaunchDto(launch));
    this.user = zone.user ? new RetrieveUserDto(zone.user) : undefined;
    this.markedAsDeleted = !!zone.markedAsDeleted;
    this.alias = zone.alias;
  }
  id: string;
  name: string;
  alias: string;
  launches: RetrieveLaunchDto[];
  markedAsDeleted: boolean;
  user: RetrieveUserDto;
}
