import { Launches } from 'src/modules/mikroorm/entities/Launches';

export class RetrieveLaunchDto {
  constructor(launch: Launches) {
    this.id = launch.id.toString();
    this.createdAt = launch.timestamp;
    this.gameAlias = launch.game.name;
    this.zoneAlias = launch.zone.alias;
    this.zoneName = launch.zone.name;
    this.zoneHardwareKey = launch.zone.zoneHardwareKey;
    this.zoneRegistered = launch.zone.zoneRegistered === 1;
    this.zoneDisabled = launch.zone.zoneDisabled;
  }
  id: string;
  createdAt: Date;
  gameAlias: string;
  zoneAlias: string;
  zoneName: string;
  zoneHardwareKey: string;
  zoneRegistered: boolean;
  zoneDisabled: boolean;
}
