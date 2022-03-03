import {MigrationInterface, QueryRunner} from "typeorm";

export class DeprecateInstituteProfession1646265653075 implements MigrationInterface {
    name = 'DeprecateInstituteProfession1646265653075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "profession" TO "professionOld"`);
        await queryRunner.query(`ALTER TYPE "public"."institution_profession_enum" RENAME TO "institution_professionold_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."institution_professionold_enum" RENAME TO "institution_profession_enum"`);
        await queryRunner.query(`ALTER TABLE "institution" RENAME COLUMN "professionOld" TO "profession"`);
    }

}
