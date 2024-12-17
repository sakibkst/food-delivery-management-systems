import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Adjust path
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get JWT from Authorization header
      secretOrKey: 'ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515', // Ensure this is the same secret used to sign the JWT
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT Payload:', payload); // Log the payload to see if it gets decoded correctly

    if (!payload) {
      console.log('Invalid JWT payload');
      throw new UnauthorizedException('Invalid token'); // Unauthorized if no payload
    }

    return { userId: payload.sub, username: payload.username }; // Return user info from payload
  }
}
