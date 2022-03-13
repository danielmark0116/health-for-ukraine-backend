import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocatioAndItsRelationToInstitution1647126140531 implements MigrationInterface {
    name = 'AddLocatioAndItsRelationToInstitution1647126140531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "locationExtId" character varying NOT NULL, "title" character varying NOT NULL, "language" character varying NOT NULL, "resultType" character varying NOT NULL, "localityType" character varying, "lat" numeric NOT NULL, "lng" numeric NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "institution" ADD "locationId" uuid`);
        await queryRunner.query(`ALTER TABLE "institution" ADD CONSTRAINT "UQ_ae37cd1f348618953ef4c6d2499" UNIQUE ("locationId")`);
        await queryRunner.query(`ALTER TABLE "institution" ADD CONSTRAINT "FK_ae37cd1f348618953ef4c6d2499" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP CONSTRAINT "FK_ae37cd1f348618953ef4c6d2499"`);
        await queryRunner.query(`ALTER TABLE "institution" DROP CONSTRAINT "UQ_ae37cd1f348618953ef4c6d2499"`);
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "locationId"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
