import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateConfigDto } from './dto/update-config.dto';
import { StatusService } from './status.service';
import { RequestWithUser } from 'src/types/interfaces';

@Controller({
  path: 'status',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.statusService.findAll(req.user);
  }

  // @Put('/configs/:id')
  // updateConfig(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
  //   return this.statusService.updateConfig(+id, updateConfigDto);
  // }
}
