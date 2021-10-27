import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from './user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  async validate(): Promise<User> {
    return { userId: 1 };
  }
}
