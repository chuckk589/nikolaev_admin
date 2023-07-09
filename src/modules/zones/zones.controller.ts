import { UpdateZoneAndUserDto } from './dto/update-zone-and-user.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: 'zones',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Patch(':id')
  @UseGuards(RoleGuard(['admin']))
  update(@Param('id') id: string, @Body() updateZoneAndUserDto: UpdateZoneAndUserDto) {
    return this.zonesService.update(+id, updateZoneAndUserDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(['admin']))
  remove(@Param('id') id: string) {
    return this.zonesService.remove(+id);
  }
}
