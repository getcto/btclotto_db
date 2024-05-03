import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.userCreateInput) {

    // get error message from prisma
    try {
      const user = await this.databaseService.user.create({
        data: createUserDto,
      });

      //return user and success code
      return { message: 'success', user }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          return(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
    }
  }
  
  async findOne(walletAddress: string) {
    const user =  await this.databaseService.user.findUnique({
      where: { 
        wallet_address: walletAddress
       },
    });

    if (!user) {
      return { message: 'User not found' }
    }

    return { message: 'success', user }
  }

  async findAll() {
    const res = await this.databaseService.user.findMany();

    try {
      if (res.length === 0) {
        return { message: 'No user found' }
      }
      return { message: 'success', res, total: res.length}
    } 
    catch (error) {
      return { message: 'Error occured', error }
    }
  }

  async update(walletAddress: string, updateUserDto: Prisma.userUpdateInput) {
    return await this.databaseService.user.update({
      where: { wallet_address: walletAddress },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.user.delete({
      where: { id },
    });
  }
}
