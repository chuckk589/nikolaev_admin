import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/interfaces';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller({
  path: 'launches',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get()
  @UseGuards(RoleGuard(['admin', 'moderator']))
  findAll(@Req() req: RequestWithUser) {
    return this.launchesService.findAll(req.user);
  }
}
