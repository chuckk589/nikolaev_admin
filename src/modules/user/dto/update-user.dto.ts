import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  role: string;
  @IsOptional()
  @IsString()
  zone: string;
}
