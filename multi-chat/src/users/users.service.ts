import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {}
  public async getJwtToken(user: User): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }
}
