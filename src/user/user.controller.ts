import { Body, Controller, Get, Param, Patch, Post, Put, Req, Request, UnauthorizedException } from '@nestjs/common';
import { from, Observable } from 'rxjs';


import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User>{
    return from(this.userService.createUser(user));
  }

  // @Public()
  @Get()
  findAll(@Req() req: Request): Observable<User[]> {
    return from(this.userService.findAllUsers());
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() user: User,
    @Request() req) {
      if (id === req.session.user.id) {
        return this.userService.update(id, user);
      } else {
        throw new UnauthorizedException();
      }
  }
}
