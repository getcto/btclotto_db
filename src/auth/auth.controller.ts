import { Controller, Get, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthFilter } from './auth.filter';

import { TwitterGuard } from './twitter/twitter.guard';

import type { Request, Response } from 'express';

const cookieSettings = {
  httpOnly: true,
  secure: true,
};

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Get('twitter')
  @UseGuards(TwitterGuard)
  authTwitter(@Req() req: Request) {
    return req.user;
  }

  // TODO: fix user typings

  // @Get('twitter/callback')
  // @UseGuards(TwitterGuard)
  // @UseFilters(AuthFilter)
  // authTwitterCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   res.cookie('twitter.accessToken', (req.user as any).accessToken, cookieSettings);
  //   // TODO: handle refresh token...
  //   res.cookie('twitter.refreshToken', (req.user as any).refreshToken, cookieSettings);
  //   res.cookie('twitter.id', (req.user as any).id, cookieSettings);
  //   res.cookie('twitter.name', (req.user as any).name, cookieSettings);
  //   res.cookie('twitter.username', (req.user as any).username, cookieSettings);
  //   res.redirect(`${this.configService.get('WEBAPP_URL')}/connect`);
  // }

  @Get('twitter/callback')
  @UseGuards(TwitterGuard)
  async twitterAuthCallback(@Req() req, @Res() res) {
    // Handles the Twitter OAuth callback
    // const user = req.user;
    // res.json(user);
    // Optionally, redirect to your frontend application
    return res.redirect('https://test.dragoorbz.com/profile');
  }

  

  @Get('disconnect')
  disconnect(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('twitter.accessToken', cookieSettings);
    res.clearCookie('twitter.refreshToken', cookieSettings);
    res.clearCookie('twitter.id', cookieSettings);
    res.clearCookie('twitter.name', cookieSettings);
    res.clearCookie('twitter.username', cookieSettings);
    res.redirect(this.configService.get('WEBAPP_URL'));
  }
}
