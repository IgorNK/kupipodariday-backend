import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ConfigModule } from '@nestjs/config';
import { configuration, configSchema } from './app.configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { getTypeOrmModuleOptions } from '../ormconfig';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlistlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
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
        // new winston.transports.DailyRotateFile({
        //   filename: 'logs/error-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD-HH',
        //   maxSize: '20m',
        //   maxFiles: 3,
        //   level: 'error',
        // }),
      ],
    }),
    ConfigModule.forRoot({
      validationSchema: configSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => getTypeOrmModuleOptions(),
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 3600,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
