import { MigrationInterface, QueryRunner } from 'typeorm';

export class tryFavNew51676370894503 implements MigrationInterface {
	name = 'tryFavNew51676370894503';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "track" ADD "isFavorite" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "isFavorite"`);
	}
}
