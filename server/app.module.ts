import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { AngularUniversalModule } from '@nestjs/ng-universal'
import { join } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './src/user/user.module'
import { AuthModule } from './src/auth/auth.module'

import { default as config } from './config'

const BROWSER_DIR = join(process.cwd(), 'dist/browser')

const domino = require('domino')
const fs = require('fs')
const template = fs.readFileSync(join(BROWSER_DIR, 'index.html')).toString()
const win = domino.createWindow(template)

global['window'] = win
global['Node'] = win.Node
global['navigator'] = win.navigator
global['Event'] = win.Event
global['KeyboardEvent'] = win.Event
global['MouseEvent'] = win.Event
global['Event']['prototype'] = win.Event.prototype
global['document'] = win.document

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bundle: require('../server/main'),
      liveReload: true,
      viewsPath: BROWSER_DIR
    }),
    MongooseModule.forRoot(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
