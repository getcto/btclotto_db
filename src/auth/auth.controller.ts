import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { AuthTwitterGuard } from './twitter/twitter.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(AuthTwitterGuard)
  @Get('auth/twitter/sign_in')
  async twitterSignIn() {}
  
  @UseGuards(AuthTwitterGuard)
  @Get('auth/twitter/callback')
  async twitterSigninCallback(@Request() req): Promise<any> {
    return req.user
  }
}
