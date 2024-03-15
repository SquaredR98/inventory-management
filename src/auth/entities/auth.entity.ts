import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { User } from "../../users/entities/user.entity";
import { Roles } from "../../roles/entities/role.entity";
import { Logger } from "../../logger/entities/logger.entity";

@Entity({ name: 'Auth' })
export class Auth extends BaseEntity {
  @Column()
  uniqueAuthId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  allowedIp: string;

  @Column("text", {array: true, default: []})
  previousIps: string[];

  @Column({ nullable: true })
  deviceID: string;

  @Column({ type: "date", nullable: true })
  lastLogin: Date;

  @Column("text", { array: true, default: [] })
  permissions: string[];

  @OneToOne(() => User, (user: User) => user.auth)
  user: User

  @ManyToOne(() => Roles, (role: Roles) => role.auth)
  role: Roles

  @OneToMany(() => Logger, (logger: Logger) => logger.doneBy)
  logger: Logger;
}
