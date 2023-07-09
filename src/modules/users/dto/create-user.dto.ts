import { IsEmail, IsNumberString, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsPhoneNumber()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(8, 20)
  password: string;
  @IsNumberString()
  zone: string;
}
