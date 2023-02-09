import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackTabInit1675937711242 implements MigrationInterface {
    name = 'TrackTabInit1675937711242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying NOT NULL, "albumId" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "track"`);
    }

}
