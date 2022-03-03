import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLanguagesFieldToInstitution1646268338080 implements MigrationInterface {
    name = 'AddLanguagesFieldToInstitution1646268338080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."institution_languages_enum" AS ENUM('pl', 'ua', 'en', 'de', 'ru')`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "languages" "public"."institution_languages_enum" array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "languages"`);
        await queryRunner.query(`DROP TYPE "public"."institution_languages_enum"`);
    }

}
