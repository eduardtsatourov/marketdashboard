import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "./user.entity";

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @ManyToOne(() => UserEntity, user => user.sessions)
  user: UserEntity;
}

