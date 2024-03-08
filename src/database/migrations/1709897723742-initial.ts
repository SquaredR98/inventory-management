import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1709897723742 implements MigrationInterface {
    name = 'Initial1709897723742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "name" character varying NOT NULL, "authId" uuid NOT NULL, CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "UQ_b472bd41d6be80dae5a164ef799" UNIQUE ("phoneNumber"), CONSTRAINT "REL_8832cd2dbd98b85067c5f2420b" UNIQUE ("authId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8832cd2dbd98b85067c5f2420b" ON "Users" ("authId") `);
        await queryRunner.query(`CREATE TABLE "Roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "authId" character varying NOT NULL, "password" character varying NOT NULL, "allowedIp" character varying, "previousIps" text array NOT NULL DEFAULT '{}', "deviceID" character varying, "lastLogin" date, "permissions" text array NOT NULL DEFAULT '{}', "roleId" uuid, CONSTRAINT "PK_fee4a2ee6693dbef79c39ff336d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ActivityLogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipUsed" character varying, "deviceIdUsed" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "doneBy" character varying NOT NULL, CONSTRAINT "PK_2aaa900f45f9434a624465db5aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_8832cd2dbd98b85067c5f2420ba" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Auth" ADD CONSTRAINT "FK_9e92913f4c8be2a818ee32bf482" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" DROP CONSTRAINT "FK_9e92913f4c8be2a818ee32bf482"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_8832cd2dbd98b85067c5f2420ba"`);
        await queryRunner.query(`DROP TABLE "ActivityLogs"`);
        await queryRunner.query(`DROP TABLE "Auth"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8832cd2dbd98b85067c5f2420b"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
