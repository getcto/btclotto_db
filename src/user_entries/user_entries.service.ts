import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserEntriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserEntryDto: Prisma.user_entriesCreateInput) {
    return this.databaseService.user_entries.create({
      data: createUserEntryDto
    });
  }

  findAll() {
    return this.databaseService.user_entries.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user_entries.findUnique({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateUserEntryDto: Prisma.user_entriesUpdateInput) {
    return this.databaseService.user_entries.update({
      where: {
        id: id
      },
      data: updateUserEntryDto
    });

  }

  remove(id: number) {
    return this.databaseService.user_entries.delete({ 
      where: { 
        id: id 
      } 
    });
  }

  async getTopEntries(sessionId: string) {
    //sum up user entries amount and return top 10

    return await this.databaseService.user_entries.groupBy({
      where: {
        sessionId: sessionId
      },
      by: ['userId'],
      _sum: {
        total_ticket: true,
        total_amount: true
      },
      orderBy: {
        _sum: {
          total_amount: 'desc'
        }
      },
      take: 10
    });
  }
}
