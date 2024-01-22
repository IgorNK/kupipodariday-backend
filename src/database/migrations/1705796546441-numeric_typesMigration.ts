import { MigrationInterface, QueryRunner } from 'typeorm';

export class NumericTypesMigration1705796546441 implements MigrationInterface {
  name = 'NumericTypesMigration1705796546441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "amount" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "raised" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "price" TYPE numeric(10,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "offer" ALTER COLUMN "amount" TYPE numeric(10,2)`,
    );
  }
}
