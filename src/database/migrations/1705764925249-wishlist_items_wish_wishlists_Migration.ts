import { MigrationInterface, QueryRunner } from "typeorm";

export class WishlistItemsWishWishlistsMigration1705764925249 implements MigrationInterface {
    name = 'WishlistItemsWishWishlistsMigration1705764925249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wish" ADD "wishlistId" integer`);
        await queryRunner.query(`ALTER TABLE "wish" ADD CONSTRAINT "FK_9e85e93aa0cb29e1db7517ec10d" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wish" DROP CONSTRAINT "FK_9e85e93aa0cb29e1db7517ec10d"`);
        await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "wishlistId"`);
    }

}
