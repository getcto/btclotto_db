import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';


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

  @Post(':id')
  async getReferral(@Param('id') walletAddress: string) {
    return this.usersService.getReferral(walletAddress);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
