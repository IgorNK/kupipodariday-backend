import 'dotenv/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env['POSTGRES_HOST'] || "localhost",
    port: parseInt(process.env['POSTGRES_PORT']) || 5432,
    username: process.env['POSTGRES_USER'] || "kpduser",
    password: process.env['POSTGRES_PASSWORD'] || "super_strong_postgres_password",
    database: process.env['POSTGRES_DB'] || "kupipodariday",
    // entities: ['src/**/entities/*.entity{.ts,.js}'],
    entities: [
      join(__dirname, '/../dist/src/users/entities/*.entity{.d.ts,.js}'),
      join(__dirname, '/../dist/src/wishes/entities/*.entity{.d.ts,.js}'),
      join(__dirname, '/../dist/src/offers/entities/*.entity{.d.ts,.js}'),
      join(__dirname, '/../dist/src/wishlistlists/entities/*.entity{.d.ts,.js}'),
    ],
    // entities: [join(__dirname, '../src/**/entities/*.entity.js')],
    // entities: ['dist/**/**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/**/*.entity.{js,ts}'],
    // entities: [
    //   __dirname + '/src/users/entities/user.entity.ts',
    //   __dirname + '/src/users/entities/user.entity.js',
    // ],
    synchronize: true,
    logging: true,
  };
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['POSTGRES_HOST'] || "localhost",
  port: parseInt(process.env['POSTGRES_PORT']) || 5432,
  username: process.env['POSTGRES_USER'] || "kpduser",
  password: process.env['POSTGRES_PASSWORD'] || "super_strong_postgres_password",
  database: process.env['POSTGRES_DB'] || "kupipodariday",
  // entities: [
  //   join(__dirname, '/../dist/src/users/entities/*.entity{.d.ts,.js}'),
  //   join(__dirname, '/../dist/src/wishes/entities/*.entity{.d.ts,.js}'),
  //   join(__dirname, '/../dist/src/offers/entities/*.entity{.d.ts,.js}'),
  //   join(__dirname, '/../dist/src/wishlistlists/entities/*.entity{.d.ts,.js}'),
  // ],
  entities: ['src/**/entities/*.entity.{js,ts}'],
  // entities: [__dirname + '/../**/*.entity.js'],
  // entities: ['dist/**/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/**/*.entity.{js,ts}'],
  // entities: [
  //   __dirname + '/src/users/entities/user.entity.ts',
  //   __dirname + '/src/users/entities/user.entity.js',
  // ],
  migrations: ['src/database/migrations/*.ts'],
  // migrations: [join(__dirname, '/../src/database/migrations/*.ts')],
  synchronize: true,
});
