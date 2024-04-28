import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { UserEntriesModule } from './user_entries/user_entries.module';
import { TicketResultsModule } from './ticket-results/ticket-results.module';

@Module({
  imports: [DatabaseModule, UsersModule, UserEntriesModule, TicketResultsModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}