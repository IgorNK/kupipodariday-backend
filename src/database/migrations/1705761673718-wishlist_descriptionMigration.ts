import { MigrationInterface, QueryRunner } from 'typeorm';

export class WishlistDescriptionMigration1705761673718
  implements MigrationInterface
{
  name = 'WishlistDescriptionMigration1705761673718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "description" SET DEFAULT 'Нет описания'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "description" DROP DEFAULT`,
    );
  }
}
