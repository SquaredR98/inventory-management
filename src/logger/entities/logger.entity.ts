import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../database/base-entity";

@Entity({ name: "ActivityLogs" })
export class Logger extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  doneBy: string;
}
