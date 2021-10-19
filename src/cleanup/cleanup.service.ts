import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from 'src/user/entities/session.entity';
import { Repository } from 'typeorm';

const HOUR_IN_MILISECONDS = 3600000;

@Injectable()
export class CleanupService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  @Cron(CronExpression.EVERY_8_HOURS)
  async cleanSessions() {
    const sessions = await this.sessionRepository.find();
    sessions.forEach(async session => {
      const sessionLifeTime = new Date().getTime() - new Date(session.createDateTime).getTime();
      if ( sessionLifeTime > HOUR_IN_MILISECONDS * 8 ) {
        await this.sessionRepository.remove(session)
      }
    })
  }
}
