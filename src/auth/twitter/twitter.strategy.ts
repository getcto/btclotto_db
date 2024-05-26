import * as Strategy from 'passport-twitter-oauth2.0';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly authService: AuthService) {
    const accessToken = Buffer.from(
      `${configService.get('TWITTER_CLIENT_ID')}:${configService.get(
        'TWITTER_CLIENT_SECRET',
      )}`,
    ).toString('base64');
    super({
      clientID: configService.get('TWITTER_CLIENT_ID'),
      clientSecret: configService.get('TWITTER_CLIENT_SECRET'),
      clientType: 'private',
      callbackURL: configService.get('TWITTER_OAUTH2_CALLBACK_URL'),
      scope: ['tweet.read', 'users.read', 'follows.write', 'offline.access'],
      pkce: true,
      state: true,
      customHeaders: { Authorization: `Basic ${accessToken}` }, // https://github.com/florianmartens/passport-twitter-oauth2.0/issues/2.
    });
  }

  // async validate(accessToken: string, refreshToken: string, profile: any) {
  //   return { accessToken, refreshToken, ...profile };
  // }

  async validate(token: string, tokenSecret: string, profile: any) {
    const { username, displayName, photos } = profile;

    // Extract the profile picture URL (the first photo in the array)
    const profilePicture = photos[0]?.value;

    // You can then pass these to your auth service or directly return them
    const user = await this.authService.validateUser({
      username,
      displayName,
      profilePicture,
    });

    return user;
  }
}
