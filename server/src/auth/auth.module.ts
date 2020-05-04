import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/User.schema';

import { default as config } from '../../config'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }]),
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true
    }),
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
        algorithm: 'HS384'
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassportModule]
})
export class AuthModule { }
