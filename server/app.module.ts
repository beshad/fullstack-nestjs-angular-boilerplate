import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { UserController } from './src/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './src/user/user.module';
import { UserService } from './src/user/user.service';


@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    MongooseModule.forRoot('mongodb://localhost/fullstack-nestjs-angular-boilerplate',{ useNewUrlParser: true }),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule {}
