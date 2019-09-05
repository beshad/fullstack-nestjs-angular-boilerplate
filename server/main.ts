import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

import 'localstorage-polyfill';
global['localStorage'] = localStorage;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');
  app.enableCors(); // enabling CORS
  await app.listen(4000);
}
bootstrap();
