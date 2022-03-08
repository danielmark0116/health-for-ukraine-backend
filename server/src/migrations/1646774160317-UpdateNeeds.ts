import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateNeeds1646774160317 implements MigrationInterface {
    name = 'UpdateNeeds1646774160317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "needTitle"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "needDescription"`);
        await queryRunner.query(`ALTER TABLE "need" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "need" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "need" ADD "lat" character varying`);
        await queryRunner.query(`ALTER TABLE "need" ADD "long" character varying`);
        await queryRunner.query(`ALTER TABLE "need" ADD "postedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "need" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "need" ADD "urgency" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "need" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "urgency"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "postedBy"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "need" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "need" ADD "needDescription" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "need" ADD "needTitle" character varying NOT NULL`);
    }

}
