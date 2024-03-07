import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1709807876669 implements MigrationInterface {
    name = 'Initial1709807876669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "UQ_b472bd41d6be80dae5a164ef799" UNIQUE ("phoneNumber"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ActivityLogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "doneBy" character varying NOT NULL, CONSTRAINT "PK_2aaa900f45f9434a624465db5aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "authId" character varying NOT NULL, "password" character varying NOT NULL, "allowedIp" character varying, "previousIps" text array, "deviceID" character varying, "lastLogin" date, "userId" uuid, CONSTRAINT "REL_10b96a5538c04c5c9a93f33b96" UNIQUE ("userId"), CONSTRAINT "PK_fee4a2ee6693dbef79c39ff336d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Auth" ADD CONSTRAINT "FK_10b96a5538c04c5c9a93f33b960" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" DROP CONSTRAINT "FK_10b96a5538c04c5c9a93f33b960"`);
        await queryRunner.query(`DROP TABLE "Auth"`);
        await queryRunner.query(`DROP TABLE "ActivityLogs"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
