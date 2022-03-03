import {MigrationInterface, QueryRunner} from "typeorm";

export class DeprecateServiceType1646267570151 implements MigrationInterface {
    name = 'DeprecateServiceType1646267570151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "serviceType" TO "serviceTypeOld"`);
        await queryRunner.query(`ALTER TYPE "public"."institution_servicetype_enum" RENAME TO "institution_servicetypeold_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."institution_servicetypeold_enum" RENAME TO "institution_servicetype_enum"`);
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "serviceTypeOld" TO "serviceType"`);
    }

}
