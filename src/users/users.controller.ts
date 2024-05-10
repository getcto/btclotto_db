import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.userCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') walletAddress: string) {
    console.log("waaaa",walletAddress)
    return this.usersService.findOne(walletAddress);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') walletAddress: string, @Body() updateUserDto: Prisma.userUpdateInput) {
    return this.usersService.update(walletAddress, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
