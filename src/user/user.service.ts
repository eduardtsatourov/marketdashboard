import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: User): Observable<User>{
    return from(this.userRepository.save(user));
  }

  findAllUsers(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  update(id: string, user: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }
}
