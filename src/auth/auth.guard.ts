import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { SessionEntity } from 'src/user/entities/session.entity';
import { Repository } from 'typeorm';
import { IS_PUBLIC_KEY } from './is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private reflector: Reflector
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //no authentication needed when @Public decorator is added to method in controller
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const sessionId = req.headers["x-session-id"];
    const session = await this.sessionRepository.findOne(sessionId);
    if (session) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
