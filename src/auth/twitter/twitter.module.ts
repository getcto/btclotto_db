import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { TwitterStrategy } from './twitter.strategy';

@Module({
  imports: [PassportModule],
  providers: [ConfigService, TwitterStrategy],
  exports: [TwitterAuthModule],
})
export class TwitterAuthModule {}
