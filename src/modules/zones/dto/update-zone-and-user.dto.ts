import { IsBoolean, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateZoneAndUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  @Length(8, 20)
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  markedAsDeleted: boolean;
}
