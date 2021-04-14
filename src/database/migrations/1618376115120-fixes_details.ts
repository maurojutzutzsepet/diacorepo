import {MigrationInterface, QueryRunner} from "typeorm";

export class fixesDetails1618376115120 implements MigrationInterface {
    name = 'fixesDetails1618376115120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "primer_nombre" varchar(40)`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "segundo_nombre" varchar(40)`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "primer_apellido" varchar(40)`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "segundo_apellido" varchar(40)`);
        await queryRunner.query(`ALTER TABLE "users_details" DROP CONSTRAINT "DF_56362a1f5c184eeea0d23ca3bea"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD CONSTRAINT "DF_56362a1f5c184eeea0d23ca3bea" DEFAULT CURRENT_TIMESTAMP FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "users_details" DROP CONSTRAINT "DF_2fc4dcbefbf74183cac84fafe7d"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD CONSTRAINT "DF_2fc4dcbefbf74183cac84fafe7d" DEFAULT CURRENT_TIMESTAMP FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_90ac11c87467814046986a6c616"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_90ac11c87467814046986a6c616" DEFAULT CURRENT_TIMESTAMP FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT CURRENT_TIMESTAMP FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "DF_e6c4ead7310ae3dadd4294e387e"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "DF_e6c4ead7310ae3dadd4294e387e" DEFAULT CURRENT_TIMESTAMP FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "DF_c13070745ded32a88c920015f7e"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "DF_c13070745ded32a88c920015f7e" DEFAULT CURRENT_TIMESTAMP FOR "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "DF_c13070745ded32a88c920015f7e"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "DF_c13070745ded32a88c920015f7e" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "DF_e6c4ead7310ae3dadd4294e387e"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "DF_e6c4ead7310ae3dadd4294e387e" DEFAULT getdate() FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "DF_90ac11c87467814046986a6c616"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "DF_90ac11c87467814046986a6c616" DEFAULT getdate() FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "users_details" DROP CONSTRAINT "DF_2fc4dcbefbf74183cac84fafe7d"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD CONSTRAINT "DF_2fc4dcbefbf74183cac84fafe7d" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users_details" DROP CONSTRAINT "DF_56362a1f5c184eeea0d23ca3bea"`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD CONSTRAINT "DF_56362a1f5c184eeea0d23ca3bea" DEFAULT getdate() FOR "createAt"`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "segundo_apellido" varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "primer_apellido" varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "segundo_nombre" varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "primer_nombre" varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_details" ADD "email" varchar(255) NOT NULL`);
    }

}
