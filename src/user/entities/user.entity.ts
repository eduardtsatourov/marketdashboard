import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./session.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => SessionEntity, session => session.user, {nullable: true})
  sessions: SessionEntity[];

  @Column('boolean', {default: false})
  showMarketLosers: boolean;
}
