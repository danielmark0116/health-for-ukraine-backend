import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewServiceTypeToInstitution1646267864622 implements MigrationInterface {
    name = 'AddNewServiceTypeToInstitution1646267864622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."institution_servicetype_enum" AS ENUM('phone', 'visit', 'on-site')`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "serviceType" "public"."institution_servicetype_enum" array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "serviceType"`);
        await queryRunner.query(`DROP TYPE "public"."institution_servicetype_enum"`);
    }

}
