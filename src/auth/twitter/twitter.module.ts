import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { TwitterStrategy } from './twitter.strategy';
import { AuthService } from '../auth.service';


@Module({
  imports: [PassportModule],
  providers: [ConfigService, TwitterStrategy, AuthService],
  exports: [TwitterAuthModule],
})
export class TwitterAuthModule {}
