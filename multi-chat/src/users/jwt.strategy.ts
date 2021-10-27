import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Socket } from 'socket.io';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { parse } from 'cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'password',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request & Socket) => {
          const cookies = request?.cookies;
          if (cookies) {
            return cookies['auth-cookie'];
          }
          const cookie: any = parse(request?.handshake?.headers?.cookie);
          if (cookie['auth-cookie']) {
            return cookie['auth-cookie'];
          }
          return null;
        },
      ]),
    });
  }
  async validate(payload: any) {
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
