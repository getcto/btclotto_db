import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketResultsService } from './ticket-results.service';


@Controller('ticket-results')
export class TicketResultsController {
  constructor(private readonly ticketResultsService: TicketResultsService) {}

  // @Post()
  // create() {
  //   return this.ticketResultsService.create();
  // }

  @Get()
  findAll() {
    return this.ticketResultsService.findAll();
  }

  @Post('/mega')
  async updateMegaTicketResult(@Body()
  {sessionId}: {sessionId: number}
 ) {
    return await this.ticketResultsService.updateMegaTicketResult(sessionId);
  }

  @Post('/million')
  async updateMillionTicketResult(@Body()
  {sessionId}: {sessionId: number}
 ) {
    return await this.ticketResultsService.updateMillionTicketResult(sessionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.ticketResultsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketResultsService.remove(+id);
  }
}
