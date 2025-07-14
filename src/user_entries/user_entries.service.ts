import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


export interface TotalTicketResult {
  userId: number;
  total_ticket: string;
  total_amount: number;
}

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
    const result = await this.databaseService.user_entries.findMany({
      where: {
        sessionId: sessionId
      },
      select: {
        userId: true,
        total_amount: true,
        total_ticket: true
      }
    });

  //   [
  //     {
  //         "userId": 1,
  //         "total_amount": 0.0188,
  //         "total_ticket": "88,1,99"
  //     },
  //     {
  //         "userId": 5,
  //         "total_amount": 0.0009,
  //         "total_ticket": "4,5"
  //     },
  //     {
  //         "userId": 1,
  //         "total_amount": 0.0009,
  //         "total_ticket": "4,5"
  //     }
  // ]


    //group by userId and sum up the total ticket and total amount
    const groupedResult = result.reduce((acc, curr) => {
      if (acc[curr.userId]) {
        acc[curr.userId].total_amount += curr.total_amount;
        acc[curr.userId].total_ticket += curr.total_ticket;
      } else {
        acc[curr.userId] = {
          userId: curr.userId,
          total_amount: curr.total_amount,
          total_ticket: curr.total_ticket
        }
      }
      return acc;
    }, {} as Record<number, TotalTicketResult>);

    //sort the result by total amount
    const sortedResult = Object.values(groupedResult).sort((a, b) => b.total_amount - a.total_amount);

    return sortedResult;
  }

  private sumAmount(amountString: number): number {
    //sum up the amount of each ticket
    const amount = amountString;
    return amount;
  }

  private sumTickets(ticketString: string): number {
    const tickets = ticketString.split(',').map(Number).reduce((acc, curr) => acc + curr, 0);
    return tickets;
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
