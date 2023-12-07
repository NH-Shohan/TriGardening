// src/Auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '565131900782-nuoge9aj5pondismpmg4i5qcom61dasq.apps.googleusercontent.com', // Replace with your actual Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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', // Replace with your actual Google Client Secret
      // google.strategy.ts
callbackURL: 'http://localhost:3000/user/google/callback',

      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('Google Profile:', profile);
    const { name, email, picture } = profile._json;

    const user = await this.userService.findOrCreateGoogleUser(name, email, picture);

    if (!user) {
      throw new UnauthorizedException('Unable to authenticate through Google');
    }

    return done(null, user);
  }
}