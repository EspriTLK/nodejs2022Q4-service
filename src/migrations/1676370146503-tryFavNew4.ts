import { MigrationInterface, QueryRunner } from 'typeorm';

export class tryFavNew41676370146503 implements MigrationInterface {
	name = 'tryFavNew41676370146503';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "album" ADD "isFavorite" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "isFavorite"`);
	}
}
