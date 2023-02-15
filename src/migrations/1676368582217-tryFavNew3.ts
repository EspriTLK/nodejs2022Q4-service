import { MigrationInterface, QueryRunner } from 'typeorm';

export class tryFavNew31676368582217 implements MigrationInterface {
	name = 'tryFavNew31676368582217';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "favorite_albums_album" ("favoriteId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4247432ea32c9166fead9833826" PRIMARY KEY ("favoriteId", "albumId"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_c2bdc9716bf0cf30d4275ceefc" ON "favorite_albums_album" ("favoriteId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_bd3dab78afa4f449ef616a2449" ON "favorite_albums_album" ("albumId") `,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite_albums_album" ADD CONSTRAINT "FK_bd3dab78afa4f449ef616a24491" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_bd3dab78afa4f449ef616a24491"`,
		);
		await queryRunner.query(
			`ALTER TABLE "favorite_albums_album" DROP CONSTRAINT "FK_c2bdc9716bf0cf30d4275ceefcf"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_bd3dab78afa4f449ef616a2449"`,
		);
		await queryRunner.query(
			`DROP INDEX "public"."IDX_c2bdc9716bf0cf30d4275ceefc"`,
		);
		await queryRunner.query(`DROP TABLE "favorite_albums_album"`);
	}
}
