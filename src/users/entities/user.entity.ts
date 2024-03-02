import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../database/base.entity";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string

  @Column()
  name: string;
  
  @Column({ nullable: true })
  allowedIp: string;

  @Column("text", {array: true, nullable: true})
  previousIps: string[];

  @Column({ nullable: true })
  deviceID: string;

  @Column({ type: "date", nullable: true })
  lastLogin: Date;
}
