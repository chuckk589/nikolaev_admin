import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class DateRangeDto {
  @IsString()
  @IsOptional()
  gameId: string;
  @IsNumberString()
  @IsOptional()
  startDate: string;
  @IsNumberString()
  @IsOptional()
  endDate: string;
}
