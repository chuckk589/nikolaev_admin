import { DateRangeDto } from './dto/date-range.dto';
import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common';
import { LaunchesService } from './launches.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/interfaces';

@Controller({
  path: 'launches',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get('num')
  findAll(@Query() dateRangeDto: DateRangeDto, @Req() req: RequestWithUser) {
    return this.launchesService.findAll(dateRangeDto, req.user);
  }

  @Get()
  findOne(@Query('zoneId') id: string) {
    return this.launchesService.findByZone(+id);
  }
}
