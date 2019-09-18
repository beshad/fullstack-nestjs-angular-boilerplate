import { Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/User.schema';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }