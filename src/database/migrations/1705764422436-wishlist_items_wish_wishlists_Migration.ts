import { MigrationInterface, QueryRunner } from 'typeorm';

export class WishlistItemsWishWishlistsMigration1705764422436
  implements MigrationInterface
{
  name = 'WishlistItemsWishWishlistsMigration1705764422436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" DROP CONSTRAINT "FK_78f5c5803c8801f0f105ec23125"`,
    );
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "itemsId"`);
    await queryRunner.query(`ALTER TABLE "wish" ADD "wishlistsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_0c39f923c3fdf67dcb9cc1a8804" FOREIGN KEY ("wishlistsId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_0c39f923c3fdf67dcb9cc1a8804"`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "wishlistsId"`);
    await queryRunner.query(`ALTER TABLE "wishlist" ADD "itemsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD CONSTRAINT "FK_78f5c5803c8801f0f105ec23125" FOREIGN KEY ("itemsId") REFERENCES "wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
