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
    // get the function from the contract ABI with input parameters, in this case the ticket id is 1, and contractABI  retruns the result, totalTicket, isActive
    const contractAddress = '0x52894C9deb7688ebb22b8507609C7e8179E72630';
    const contractABI = [
      'function megSessionInfo(uint256 id) public view returns (uint256, uint256, bool)'
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, this.provider());
    const ticketResults = await contract.megSessionInfo(
      1
    );
    //return ticketResults with serialize BigInt to string

    return {
      totalTicket: ticketResults[0].toString(),
      totalAmount: ticketResults[1].toString(),
      isActive: ticketResults[2]
    };    
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
