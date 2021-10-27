import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from './user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get('login')
  //   @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user: User = { userId: 1 };
    const token = await this.userService.getJwtToken(user as User);
    // const secretData = {
    //   token,
    // };
    res.cookie('auth-cookie', token, { httpOnly: true });
    return { msg: 'success' };
  }

  @Get('fav-movies')
  @UseGuards(AuthGuard('jwt'))
  async movies(@Req() req) {
    // console.log(req.cookies);
    return ['Avatar', 'Avengers'];
  }
}
