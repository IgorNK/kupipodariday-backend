import 'dotenv/config';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: parseInt(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
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
    synchronize: false,
    logging: true,
  };
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: parseInt(process.env['DB_PORT']),
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  entities: [
    join(__dirname, '/../dist/src/users/entities/*.entity{.d.ts,.js}'),
    join(__dirname, '/../dist/src/wishes/entities/*.entity{.d.ts,.js}'),
    join(__dirname, '/../dist/src/offers/entities/*.entity{.d.ts,.js}'),
    join(__dirname, '/../dist/src/wishlistlists/entities/*.entity{.d.ts,.js}'),
  ],
  // entities: ['src/**/entities/*.entity.{js,ts}'],
  // entities: [__dirname + '/../**/*.entity.js'],
  // entities: ['dist/**/**/*.entity{.ts,.js}'],
  // entities: [__dirname + '/**/*.entity.{js,ts}'],
  // entities: [
  //   __dirname + '/src/users/entities/user.entity.ts',
  //   __dirname + '/src/users/entities/user.entity.js',
  // ],
  migrations: ['src/database/migrations/*.js'],
  // migrations: [join(__dirname, '/../src/database/migrations/*.ts')],
  synchronize: false,
});
