import { Body, Controller, Post } from '@nestjs/common';
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
}
