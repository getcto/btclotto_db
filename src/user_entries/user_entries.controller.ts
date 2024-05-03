import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEntriesService } from './user_entries.service';
import { Prisma } from '@prisma/client';


@Controller('user-entries')
export class UserEntriesController {
  constructor(private readonly userEntriesService: UserEntriesService) {}

  @Post()
  create(@Body() createUserEntryDto: Prisma.user_entriesCreateInput) {
    return this.userEntriesService.create(createUserEntryDto);
  }

  @Get('/top-entries/:sessionId')
  getTopEntries(@Param('sessionId') sessionId: string) {
    return this.userEntriesService.getTopEntries(sessionId);
  }

  @Get()
  findAll() {
    return this.userEntriesService.findAll();
  }

  @Get('/total-entries')
  async getTotalEntries() {
    return this.userEntriesService.getTotalEntries();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEntriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserEntryDto: Prisma.user_entriesUpdateInput) {
    return this.userEntriesService.update(+id, updateUserEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEntriesService.remove(+id);
  }

 

}
