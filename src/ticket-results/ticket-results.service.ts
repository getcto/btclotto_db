import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TicketResultsService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}
  private provider(): ethers.JsonRpcProvider {
    const provider = new ethers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/KviisspuxviO6WkFwKFqOyq8JZ0KWaNH');
    return provider;
  }

  // create() {
  //   return 'This action adds a new ticketResult';
  // }
  
  async findAll() {

    const res = await this.databaseService.ticket_results.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    try {
      if (res.length === 0) {
        return { message: 'No ticket result found' }
      }
      return { message: 'success', res, total: res.length}
    } 
    catch (error) {
      return { message: 'Error occured', error }
    }
  }

  async getNormalTicketResults(sessionId: string) {
    const contractAddress = '0x52894C9deb7688ebb22b8507609C7e8179E72630';
    const contractABI = [
      'function dailySessionInfo(uint256 id) public view returns (uint256, uint256, uint256, uint256, bool)'
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, this.provider());
    const ticketResults = await contract.dailySessionInfo(
      sessionId
    );

    //check if the sessionID is exist in the database
    const checkSession = await this.databaseService.ticket_results.findUnique({
      where: {
        sessionId: sessionId, // Add the 'id' property with the value of sessionId
      }
    });

    if (checkSession) {
      throw new Error('Session ID already exists');
    } else {
      const ticketResult = await this.databaseService.ticket_results.create({
        data: {
          sessionId: sessionId,
          type: 'normal', // Add the missing 'type' property
          start_date: ticketResults[0].toString(),
          end_date: ticketResults[1].toString(),
          result: ticketResults[2].toString(),
          total_amount: Number(ticketResults[3]),
          total_entries: ticketResults[3].toString(),
          isActive: ticketResults[4]
        }
      });

      return {
        startTime: ticketResults[0].toString(),
        endTime: ticketResults[1].toString(),
        result: ticketResults[2].toString(),
        totalTicket: ticketResults[3].toString(),
        isActive: ticketResults[4]
      };   
    }
  
    
    
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketResult`;
  }

  update(id: number,) {
    return `This action updates a #${id} ticketResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketResult`;
  }

  async updateMegaTicketResult(sessionId: number) {
    const contractAddress = '0x52894C9deb7688ebb22b8507609C7e8179E72630';
    const contractABI = [
      'function megSessionInfo(uint256 id) public view returns (uint256, uint256, bool)'
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, this.provider());
    const ticketResults = await contract.megSessionInfo(sessionId);

    return await this.databaseService.ticket_results.create({
      data: {
        sessionId: "sessionId.toString()",
        type: 'mega', // Add the missing 'type' property
        total_entries: ticketResults[0].toString(),
        //total_amount: ticketResults[1] convert BigInt to float
        total_amount: parseFloat(ticketResults[1].toString()),
      }
    });

    // return {
    //   totalTicket: ticketResults[0].toString(),
    //   totalAmount: ticketResults[1].toString(),
    //   isActive: ticketResults[2]
    // };
  }

  async updateMillionTicketResult(sessionId: number) {
    const contractAddress = '0x52894C9deb7688ebb22b8507609C7e8179E72630';
    const contractABI = [
      'function milSessionInfo(uint256 id) public view returns (uint256, uint256, bool)'
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, this.provider());
    const ticketResults = await contract.milSessionInfo(sessionId);

    return await this.databaseService.ticket_results.create({
      data: {
        sessionId: "sessionId.toString()",
        type: 'million', // Add the missing 'type' property
        total_entries: ticketResults[0].toString(),
        //total_amount: ticketResults[1] convert BigInt to float
        total_amount: parseFloat(ticketResults[1].toString()),
      }
    });

    return {
      totalTicket: ticketResults[0].toString(),
      totalAmount: ticketResults[1].toString(),
      isActive: ticketResults[2]
    };
  }
}
