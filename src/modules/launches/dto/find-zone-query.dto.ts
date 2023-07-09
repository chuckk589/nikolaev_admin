import { IsString, IsOptional, IsNumber } from 'class-validator';

export class FindZoneQueryDto {
  @IsString()
  @IsOptional()
  zoneId: string;
  @IsString()
  @IsOptional()
  lastNum: string;
}
