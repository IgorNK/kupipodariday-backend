import { MigrationInterface, QueryRunner } from 'typeorm';

export class WishlistItemsWishWishlistsMigration1705764586521
  implements MigrationInterface
{
  name = 'WishlistItemsWishWishlistsMigration1705764586521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_0c39f923c3fdf67dcb9cc1a8804"`,
    );
    await queryRunner.query(
      `CREATE TABLE "wishlist_items_wish" ("wishlistId" integer NOT NULL, "wishId" integer NOT NULL, CONSTRAINT "PK_bf04498b7fc0b487b15d3b62db0" PRIMARY KEY ("wishlistId", "wishId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e686abff4343ad90ca53a7fc12" ON "wishlist_items_wish" ("wishlistId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20a447bbd8b2e0c58b420300d4" ON "wishlist_items_wish" ("wishId") `,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "wishlistsId"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist_items_wish" ADD CONSTRAINT "FK_e686abff4343ad90ca53a7fc122" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist_items_wish" ADD CONSTRAINT "FK_20a447bbd8b2e0c58b420300d4d" FOREIGN KEY ("wishId") REFERENCES "wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist_items_wish" DROP CONSTRAINT "FK_20a447bbd8b2e0c58b420300d4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist_items_wish" DROP CONSTRAINT "FK_e686abff4343ad90ca53a7fc122"`,
    );
    await queryRunner.query(`ALTER TABLE "wish" ADD "wishlistsId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20a447bbd8b2e0c58b420300d4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e686abff4343ad90ca53a7fc12"`,
    );
    await queryRunner.query(`DROP TABLE "wishlist_items_wish"`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_0c39f923c3fdf67dcb9cc1a8804" FOREIGN KEY ("wishlistsId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
