import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateConfigDto } from './dto/update-config.dto';
import { StatusService } from './status.service';

@Controller({
  path: 'status',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Put('/configs/:id')
  updateConfig(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.statusService.updateConfig(+id, updateConfigDto);
  }
}
