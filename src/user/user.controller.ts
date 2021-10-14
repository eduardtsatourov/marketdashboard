import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { from, Observable } from 'rxjs';
import { Public } from 'src/auth/is-public.decorator';


import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User>{
    return from(this.userService.createUser(user));
  }

  @Public()
  @Get()
  findAll(@Req() req: Request): Observable<User[]> {
    return from(this.userService.findAllUsers());
  }
}
