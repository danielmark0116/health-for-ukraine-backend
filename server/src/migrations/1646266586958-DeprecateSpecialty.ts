import {MigrationInterface, QueryRunner} from "typeorm";

export class DeprecateSpecialty1646266586958 implements MigrationInterface {
    name = 'DeprecateSpecialty1646266586958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "specialty" TO "specialtyOld"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "specialtyOld" TO "specialty"`);
    }

}
