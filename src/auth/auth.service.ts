import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from 'src/user/entities/session.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/interfaces/user.interface';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async loginUser(user: User): Promise<string | null> {
    const foundUser = await this.userRepository.find({ where: { userName: user.userName, password: user.password }});
    if (foundUser) {
      const session = await this.sessionRepository.save({user: foundUser[0]});
      return session.id;
    }
    return null;
  }

  userLogout(sessionId: string): Promise<DeleteResult> {
    return this.sessionRepository.delete(sessionId);
  }
}
