import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { Auth } from "../../auth/entities/auth.entity";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string

  @Column()
  name: string;

  @OneToOne(() => Auth, (auth: Auth) => auth.user, {eager: true, nullable: false, cascade: true})
  @JoinColumn()
  @Index()
  auth: Auth;
}
