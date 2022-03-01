import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNeed1646151690936 implements MigrationInterface {
    name = 'AddNeed1646151690936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "need" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "needTitle" character varying NOT NULL, "needDescription" character varying NOT NULL, "contact" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_218b14514f334ee6f39954f86ba" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "need"`);
    }

}
