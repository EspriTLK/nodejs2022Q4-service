import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackTabFixNull1675940721549 implements MigrationInterface {
    name = 'TrackTabFixNull1675940721549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "artistId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "albumId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "duration" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "duration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "albumId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "artistId" SET NOT NULL`);
    }

}
