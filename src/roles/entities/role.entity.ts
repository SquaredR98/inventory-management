import { Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../database/base.entity";

export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: string;
}
