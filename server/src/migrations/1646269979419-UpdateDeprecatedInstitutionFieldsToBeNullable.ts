import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDeprecatedInstitutionFieldsToBeNullable1646269979419 implements MigrationInterface {
    name = 'UpdateDeprecatedInstitutionFieldsToBeNullable1646269979419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "professionOld" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "specialtyOld" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "serviceTypeOld" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "serviceTypeOld" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "specialtyOld" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "professionOld" SET NOT NULL`);
    }

}
