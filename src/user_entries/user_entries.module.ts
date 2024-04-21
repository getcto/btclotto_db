import { Module } from '@nestjs/common';
import { UserEntriesService } from './user_entries.service';
import { UserEntriesController } from './user_entries.controller';

@Module({
  controllers: [UserEntriesController],
  providers: [UserEntriesService],
})
export class UserEntriesModule {}
