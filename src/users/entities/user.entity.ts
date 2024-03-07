import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../database/base-entity";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string

  @Column()
  name: string;
}
