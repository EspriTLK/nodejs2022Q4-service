import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTabFixVersion1675940919485 implements MigrationInterface {
    name = 'UserTabFixVersion1675940919485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "version" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "version" DROP DEFAULT`);
    }

}
