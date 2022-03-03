import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewSpecialityToInstitution1646266947298 implements MigrationInterface {
    name = 'AddNewSpecialityToInstitution1646266947298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."institution_speciality_enum" AS ENUM('dentist', 'internist', 'cardiologist', 'neurologist', 'pediatrician', 'gynecologist', 'surgeon', 'oncologist', 'hematologist', 'orthopaedist', 'psychiatrist')`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "speciality" "public"."institution_speciality_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "speciality"`);
        await queryRunner.query(`DROP TYPE "public"."institution_speciality_enum"`);
    }

}
