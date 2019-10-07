import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './src/user/user.module';
import { AuthModule } from './src/auth/auth.module';


@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
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
