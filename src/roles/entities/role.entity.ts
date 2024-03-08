import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { Auth } from "../../auth/entities/auth.entity";

export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @OneToMany(() => Auth, (auth: Auth) => auth.role)
  auth: Auth;
}
