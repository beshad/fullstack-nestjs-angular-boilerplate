
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/interfaces/User.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  // check if user email exists
  async validateUserEmail(email): Promise<any> {
    return await this.UserModel.findOne({ email }).exec();
  }

  // authenticate password
  async authenticateUser(email, password): Promise<any> {
    this.UserModel.findOne({ email }, (err, user) => {
      if (!user) { return false }
      user.comparePassword(password, (error, isMatch) => {
        if (!isMatch) { return false; }
        console.log(user + '=======================')
        return {
          access_token: this.jwtService.sign(email, password),
          user
        };
      });
    });
  }

}
