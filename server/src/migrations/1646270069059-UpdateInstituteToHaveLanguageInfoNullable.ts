import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateInstituteToHaveLanguageInfoNullable1646270069059 implements MigrationInterface {
    name = 'UpdateInstituteToHaveLanguageInfoNullable1646270069059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "languageInfo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ALTER COLUMN "languageInfo" SET NOT NULL`);
    }

}
