import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewUserDto } from './dto/new-user.dto';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from 'src/types/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req: RequestWithUser) {
    return this.authService.signin(req.user);
  }
  @Post('signup')
  async signup(@Body() newUserDto: NewUserDto) {
    return this.authService.signup(newUserDto);
  }
  @Post('reset')
  async reset(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.reset(resetPasswordDto);
  }
}
