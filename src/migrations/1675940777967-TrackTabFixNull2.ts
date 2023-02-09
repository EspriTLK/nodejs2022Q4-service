import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackTabFixNull21675940777967 implements MigrationInterface {
    name = 'TrackTabFixNull21675940777967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "artistId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "albumId" uuid`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "albumId"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "albumId" character varying`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "artistId"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "artistId" character varying`);
    }

}
