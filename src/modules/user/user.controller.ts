import { UpdateUserDto } from './dto/update-user.dto';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller({
  path: 'user',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard(['admin']))
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @UseGuards(RoleGuard(['admin']))
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }
}
