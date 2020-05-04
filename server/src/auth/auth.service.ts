
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user/interfaces/user.interface'

import * as bcrypt from 'bcryptjs'

const saltRounds = 10

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  // check if user email is valid and exists
  async validateUserEmail(email: string): Promise<any> {
    const isValidEmail = await this.isValidEmail(email)
    if (!isValidEmail) throw new HttpException('EMAIL.EMAIL_IS_INVALID', HttpStatus.NOT_FOUND)
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
        email: user.email
      })
    }
  }

  async isValidEmail(email: string): Promise<boolean> {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return await re.test(email)
  }

  async updatePassword(email: string, newPassword: string): Promise<boolean> { 
    const user = await this.UserModel.findOne({ email: email})
    if(!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    return await user.save()
  }

}
