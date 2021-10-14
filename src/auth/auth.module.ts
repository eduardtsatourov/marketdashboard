import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from 'src/user/entities/session.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
