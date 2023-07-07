import { IsEmail, IsString, Length } from 'class-validator';

export class NewUserDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  phone: string;
  @IsString()
  @Length(8, 20)
  password: string;
  @IsString()
  @IsEmail()
  email: string;
}
