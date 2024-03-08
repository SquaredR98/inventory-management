import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { User } from "../../users/entities/user.entity";
import { Roles } from "../../roles/entities/role.entity";

@Entity({ name: 'Auth' })
export class Auth extends BaseEntity {
  @Column()
  authUserId: string;

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

  @OneToOne(() => User, (user: User) => user.auth)
  user: User

  @ManyToOne(() => Roles, (role: Roles) => role.auth)
  role: Roles
}
