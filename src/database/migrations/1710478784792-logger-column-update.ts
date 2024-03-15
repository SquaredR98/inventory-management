import { MigrationInterface, QueryRunner } from "typeorm";

export class LoggerColumnUpdate1710478784792 implements MigrationInterface {
    name = 'LoggerColumnUpdate1710478784792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "doneBy"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "action" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "tableAffected" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "columnsAffected" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "dataBeforeUpdate" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "dataAfterUpdate" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "doneById" uuid`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD CONSTRAINT "FK_4ae73cc96b3e904868a50293950" FOREIGN KEY ("doneById") REFERENCES "Auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP CONSTRAINT "FK_4ae73cc96b3e904868a50293950"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "doneById"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "dataAfterUpdate"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "dataBeforeUpdate"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "columnsAffected"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "tableAffected"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "ActivityLogs" ADD "doneBy" character varying NOT NULL`);
    }

}
