import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { default as config } from './config'

import 'localstorage-polyfill';
global['localStorage'] = localStorage;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  /* SECURITY */
  app.use(helmet());

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again later"
  }));

  const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 3, // start blocking after 3 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });
  app.use("/auth/email/register", createAccountLimiter);

  app.setGlobalPrefix('api');
  app.enableCors(); // enabling CORS

  await app.listen(config.host.port, () => console.log('\x1b[35m%s\x1b[0m', ` ----> full stack nestjs & angular app is listening on port ${config.host.port}!`))
}
bootstrap();


