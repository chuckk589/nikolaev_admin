import { IsEmail, IsString, Length } from 'class-validator';

export class NewUserDto {
  @IsString()
  username: string;
  @IsString()
  @Length(8, 20)
  password: string;
  @IsString()
  @IsEmail()
  email: string;
}
