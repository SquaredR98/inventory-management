import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { Auth } from "../../auth/entities/auth.entity";

@Entity({ name: "Roles" })
export class Roles extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;

  @OneToMany(() => Auth, (auth: Auth) => auth.role)
  auth: Auth[];
}
