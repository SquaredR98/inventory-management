import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../database/base-entity";
import { Auth } from "../../auth/entities/auth.entity";

@Entity({ name: "ActivityLogs" })
export class Logger extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  action: string;

  @Column()
  tableAffected: string;

  @Column("text", { array: true, default: [] })
  columnsAffected: string;

  @Column("jsonb")
  dataBeforeUpdate: JSON;

  @Column("jsonb")
  dataAfterUpdate: JSON;

  @ManyToOne(() => Auth, (auth: Auth) => auth.logger)
  doneBy: string;
}
