import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewProfessionToInstitute1646266186977 implements MigrationInterface {
    name = 'AddNewProfessionToInstitute1646266186977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."institution_profession_enum" AS ENUM('doctor', 'nurse', 'midwife', 'physio', 'paramedic')`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "profession" "public"."institution_profession_enum" NOT NULL DEFAULT 'doctor'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "profession"`);
        await queryRunner.query(`DROP TYPE "public"."institution_profession_enum"`);
    }

}
