import { MigrationInterface, QueryRunner } from "typeorm";

export class WishlistItemsMigration1705762708168 implements MigrationInterface {
    name = 'WishlistItemsMigration1705762708168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "itemsId" integer`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_78f5c5803c8801f0f105ec23125" FOREIGN KEY ("itemsId") REFERENCES "wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_78f5c5803c8801f0f105ec23125"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "itemsId"`);
    }

}
