import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;
}

// @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
// createDateTime: Date;