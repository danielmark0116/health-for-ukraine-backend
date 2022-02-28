import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddInstitutionAndUser1646089184686 implements MigrationInterface {
  name = 'AddInstitutionAndUser1646089184686'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('superadmin', 'admin', 'user')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."user_provider_enum" AS ENUM('internal', 'google')`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "googleId" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "provider" "public"."user_provider_enum" NOT NULL DEFAULT 'internal', "name" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "confirmedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."institution_voivodeship_enum" AS ENUM('lower-silesian', 'kuyavian-pomeranian', 'lublin', 'lubusz', 'lodz', 'lesser-poland', 'masovian', 'opole', 'subcarpathian', 'podklaskie', 'pomeranian', 'silesian', 'holy-cross', 'warmian-masurian', 'greater-poland', 'west-pomeranian')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."institution_profession_enum" AS ENUM('doctor', 'dentist', 'nurse', 'midwife', 'physio', 'paramedic')`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."institution_servicetype_enum" AS ENUM('phone', 'visit', 'on-site')`
    )
    await queryRunner.query(
      `CREATE TABLE "institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "voivodeship" "public"."institution_voivodeship_enum" NOT NULL DEFAULT 'silesian', "profession" "public"."institution_profession_enum" NOT NULL DEFAULT 'doctor', "specialty" character varying NOT NULL, "serviceType" "public"."institution_servicetype_enum" NOT NULL DEFAULT 'on-site', "addressString" character varying NOT NULL, "hours" character varying NOT NULL, "city" character varying NOT NULL, "contactData" character varying NOT NULL, "languageInfo" character varying NOT NULL, "postCode" character varying NOT NULL, "name" character varying NOT NULL, "institutionName" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f60ee4ff0719b7df54830b39087" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "institution"`)
    await queryRunner.query(`DROP TYPE "public"."institution_servicetype_enum"`)
    await queryRunner.query(`DROP TYPE "public"."institution_profession_enum"`)
    await queryRunner.query(`DROP TYPE "public"."institution_voivodeship_enum"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`)
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
  }
}
