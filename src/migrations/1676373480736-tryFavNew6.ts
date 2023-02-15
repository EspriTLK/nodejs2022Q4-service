import { MigrationInterface, QueryRunner } from 'typeorm';

export class tryFavNew61676373480736 implements MigrationInterface {
	name = 'tryFavNew61676373480736';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "artist" ADD "isFavorite" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isFavorite"`);
	}
}
