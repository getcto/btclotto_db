import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(profile: any): Promise<any> {
    const { username, displayName, profile_image_url } = profile;
    // Here you would typically find or create the user in your database
    // For demonstration, we return a mock user object

    const user = {
      username,
      displayName,
      profile_image_url,
    };

    return user;
  }
}
