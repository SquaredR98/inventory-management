import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../database/base.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ name: 'Auth' })
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  allowedIp: string;

  @Column("text", {array: true, nullable: true})
  previousIps: string[];

  @Column({ nullable: true })
  deviceID: string;

  @Column({ type: "date", nullable: true })
  lastLogin: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
