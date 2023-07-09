import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsString()
  surname: string;
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @Length(8, 20)
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  oldPassword: string;
}
