import { Module } from '@nestjs/common'
import { AngularUniversalModule } from '@nestjs/ng-universal'
import { join } from 'path'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './src/user/user.module'
import { AuthModule } from './src/auth/auth.module'

const BROWSER_DIR = join(process.cwd(), 'dist/browser')

const domino = require('domino')
const fs = require('fs')
const template = fs.readFileSync(join(BROWSER_DIR , 'index.html')).toString()
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
    MongooseModule.forRoot('mongodb://localhost/fullstack-nestjs-angular-boilerplate',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule { }
