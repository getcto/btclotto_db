import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';

import { TwitterAuthModule } from './twitter/twitter.module';


@Module({
  imports: [PassportModule, TwitterAuthModule],
  controllers: [AuthController],
  providers: [ConfigService],
})
export class AuthModule {}
