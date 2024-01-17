import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app.configuration';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { getTypeOrmModuleOptions } from '../ormconfig';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

const configSchema = Joi.object({
  port: Joi.number().integer().default(3000),
  database: Joi.object({
    host: Joi.string().pattern(/postgres:\/\/[a-zA-Z]/).required(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.number().integer().default(5432),
  }),
});

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '20m',
          maxFiles: 3,
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({
      validationSchema: configSchema,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...getTypeOrmModuleOptions(),
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    AppService
  ],
})
export class AppModule {}
