
import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor() { }

  async login(body): Promise<any> {
    // let isMatch = await user.comparePassword(body.password); 
    // if (!isMatch) throw new NotFoundException('incorrect password');
    // return await jwt.sign(
    //   { user }, 
    //   process.env.SECRET_TOKEN);
  }

}
