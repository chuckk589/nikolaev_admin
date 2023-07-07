import { IsString, Length, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @Length(8, 20)
  newPassword: string;
  @IsString()
  @Length(8, 20)
  password: string;
  @IsString()
  @IsEmail()
  email: string;
}
