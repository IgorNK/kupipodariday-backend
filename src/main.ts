import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import helmet from 'helmet';
import { nestCsrf } from 'ncsrf';
import * as cookieParser from 'cookie-parser';
import { AppDataSource } from 'ormconfig';

async function bootstrap() {
  if (AppDataSource.isInitialized === false) {
    await AppDataSource.initialize();
  }

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('KupiPodariDay API')
    .setDescription('Wishlist service')
    .setVersion('1.0')
    .addTag('KupiPodariDay')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.use(cookieParser());
  app.use(nestCsrf());
  await app.listen(3000);
}
bootstrap();
