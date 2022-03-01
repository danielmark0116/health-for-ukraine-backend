import {MigrationInterface, QueryRunner} from "typeorm";

export class AddValidatedFieldToInstitution1646149473217 implements MigrationInterface {
    name = 'AddValidatedFieldToInstitution1646149473217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ADD "validated" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "validated"`);
    }

}
