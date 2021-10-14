import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { DeleteResult } from 'typeorm';
import { AuthService } from './auth.service';
import { Public } from './is-public.decorator';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('login')
  login(@Body() user: User): Promise<string | null> {
    return this.authService.loginUser(user);
  }

  @Post('logout')
  logout(@Body() body): Promise<DeleteResult> {
    return this.authService.userLogout(body.sessionId);
  }
}
