import {MigrationInterface, QueryRunner} from "typeorm";

export class primeraMirgracion1619027138495 implements MigrationInterface {
    name = 'primeraMirgracion1619027138495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quejas" ("id" int NOT NULL IDENTITY(1,1), "descripcion" varchar(250) NOT NULL, "user" varchar(60) NOT NULL, "createAt" datetime NOT NULL CONSTRAINT "DF_a7aed1ddc6c4586b5937d9bfbcc" DEFAULT CURRENT_TIMESTAMP, "updatedAt" datetime, "status" varchar(8) NOT NULL CONSTRAINT "DF_fca07bca6113f09e54e25bfb9f2" DEFAULT 'ACTIVE', "comercioId" int, CONSTRAINT "PK_382b57b1aeec364773f7f6c9a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comercios" ("id" int NOT NULL IDENTITY(1,1), "nombre_comercio" varchar(60) NOT NULL, "nit" varchar(60) NOT NULL, "telefono" varchar(20) NOT NULL, "direccion" varchar(100) NOT NULL, "email" varchar(40) NOT NULL, "municipio" int NOT NULL, "departamento" int NOT NULL, "region" int NOT NULL, "status" varchar(8) NOT NULL CONSTRAINT "DF_f60c40828b73e1c5f7b0d9313b8" DEFAULT 'ACTIVE', "createAt" datetime NOT NULL CONSTRAINT "DF_3d39d30b97ff2b71e3a94e7403a" DEFAULT CURRENT_TIMESTAMP, "updatedAt" datetime NOT NULL CONSTRAINT "DF_80f7410a45dacb8d0480f3f4ee3" DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_eebb0a6b0c9c94734483ccaf3ff" UNIQUE ("nombre_comercio"), CONSTRAINT "UQ_8ed955d34f5b785d74394229afd" UNIQUE ("nit"), CONSTRAINT "PK_f886203d76afacf779ac3a562c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_details" ("id" int NOT NULL IDENTITY(1,1), "primer_nombre" varchar(40), "segundo_nombre" varchar(40), "primer_apellido" varchar(40), "segundo_apellido" varchar(40), "createAt" datetime NOT NULL CONSTRAINT "DF_56362a1f5c184eeea0d23ca3bea" DEFAULT CURRENT_TIMESTAMP, "updatedAt" datetime NOT NULL CONSTRAINT "DF_2fc4dcbefbf74183cac84fafe7d" DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_05b6d195a298be51e8fd56e8bc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "cui" varchar(13) NOT NULL, "password" varchar(60) NOT NULL, "email" varchar(255) NOT NULL, "createAt" datetime NOT NULL CONSTRAINT "DF_90ac11c87467814046986a6c616" DEFAULT CURRENT_TIMESTAMP, "updatedAt" datetime NOT NULL CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT CURRENT_TIMESTAMP, "status" varchar(8) NOT NULL CONSTRAINT "DF_3676155292d72c67cd4e090514f" DEFAULT 'ACTIVE', "detail_id" int NOT NULL, CONSTRAINT "UQ_39b795db102143d14595c873638" UNIQUE ("cui"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_9fc134ca20766e165ad650ee74" ON "users" ("detail_id") WHERE "detail_id" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" int NOT NULL IDENTITY(1,1), "nombre" varchar(20) NOT NULL, "descripcion" text NOT NULL, "createAt" datetime NOT NULL CONSTRAINT "DF_e6c4ead7310ae3dadd4294e387e" DEFAULT CURRENT_TIMESTAMP, "updatedAt" datetime NOT NULL CONSTRAINT "DF_c13070745ded32a88c920015f7e" DEFAULT CURRENT_TIMESTAMP, "status" varchar(8) NOT NULL CONSTRAINT "DF_14958a120176d4e1e8be423977c" DEFAULT 'ACTIVE', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" int NOT NULL, "rolesId" int NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "quejas" ADD CONSTRAINT "FK_01f3299c0f111be77a224b6465d" FOREIGN KEY ("comercioId") REFERENCES "comercios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "users_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "quejas" DROP CONSTRAINT "FK_01f3299c0f111be77a224b6465d"`);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles"`);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP INDEX "REL_9fc134ca20766e165ad650ee74" ON "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_details"`);
        await queryRunner.query(`DROP TABLE "comercios"`);
        await queryRunner.query(`DROP TABLE "quejas"`);
    }

}
