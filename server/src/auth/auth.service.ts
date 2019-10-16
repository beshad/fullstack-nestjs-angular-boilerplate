
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user/interfaces/User.interface'

import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  // check if user email exists
  async validateUserEmail(email: string): Promise<any> {
    return await this.UserModel.findOne({ email }).exec()
  }

  async comparePassword(userEnteredPassword: string, dbStoredPassword: string): Promise<any> {
    return await bcrypt.compareSync(userEnteredPassword, dbStoredPassword)
  }

  // authenticate password
  async authenticateUser(email: string, password: string): Promise<any> {
    const user = await this.UserModel.findOne({ email }).exec()
    if (!user) { throw new UnauthorizedException() }
    const isMatch = await this.comparePassword(password, user.password)
    if (!isMatch) { throw new UnauthorizedException() }
    return {
      token: this.jwtService.sign({
        email: user.email,
        fullname: user.fullname,
        role: user.role,
        sub: user.userId
      })
    }
  }

}
