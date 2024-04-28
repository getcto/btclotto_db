import { Module } from '@nestjs/common';
import { TicketResultsService } from './ticket-results.service';
import { TicketResultsController } from './ticket-results.controller';

@Module({
  controllers: [TicketResultsController],
  providers: [TicketResultsService],
})
export class TicketResultsModule {}
