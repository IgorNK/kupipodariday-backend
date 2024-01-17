import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: parseInt(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    entities: ['src/**/entities/*.entity{.ts,.js'],
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
  entities: ['src/**/entities/*.entity{.ts,.js'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});