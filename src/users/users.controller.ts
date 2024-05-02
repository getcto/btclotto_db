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
  findOne(@Param('id') walletAdress: string) {
    console.log("waaaa",walletAdress)
    return this.usersService.findOne(walletAdress);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') walletAdress: string, @Body() updateUserDto: Prisma.userUpdateInput) {
    return this.usersService.update(walletAdress, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
