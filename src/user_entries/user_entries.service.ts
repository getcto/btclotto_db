import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getHistoryByWalletAddress(walletAddress: string) {
    if (!walletAddress || walletAddress === '') {
      return { message: 'Wallet address is required' }
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        wallet_address: walletAddress
      }
    });

    const result = await this.databaseService.user_entries.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        sessionId: 'desc'
      }
    });

    if (result.length === 0) {
      throw new NotFoundException('No data found');
    }

    return {
      message: 'success',
      result
    }
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
    const result =  await this.databaseService.user_entries.groupBy({
      where: {
        sessionId: sessionId
      },
      by: ['userId'],
      _sum: {
        // total_ticket: true,
        total_amount: true
      },
      orderBy: {
        _sum: {
          total_amount: 'desc'
        }
      },
      take: 10
    });

    //return result with user data from user table
    return {
      message: 'success',
      result
    }
  }

  async getTotalEntries() {
    const res = await this.databaseService.user_entries.findMany();
    const totalEntries = res.reduce((acc, curr) => {
      // acc.total_ticket += curr.total_ticket;
      acc.total_amount += curr.total_amount;
      return acc;
    }, { total_ticket: 0, total_amount: 0 });

    return totalEntries;
  }
}
