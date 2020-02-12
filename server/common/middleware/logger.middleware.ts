import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import * as moment from 'moment'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`[ng nestjs boilerplate] - ${moment().format('LLL')} | ${req.method}[${res.statusCode}] | ${req.headers.host}${req.baseUrl}`);
    next();
  }
}