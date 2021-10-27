import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'password',
      signOptions: { expiresIn: '1h' },
    }),
    JwtStrategy,
  ],
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
