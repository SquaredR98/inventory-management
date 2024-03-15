import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthColumnUpdate1710314638511 implements MigrationInterface {
    name = 'AuthColumnUpdate1710314638511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" RENAME COLUMN "authId" TO "uniqueAuthId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" RENAME COLUMN "uniqueAuthId" TO "authId"`);
    }

}
