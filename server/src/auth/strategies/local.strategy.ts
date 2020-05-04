import { Strategy } from 'passport-local'
import { ModuleRef } from '@nestjs/core'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

import { ContextIdFactory } from '@nestjs/core/helpers/context-id-factory'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true
    })
  }

  async validate(
    request: Request,
    email: string, 
    password: string): Promise<any> 
    {
    const contextId = ContextIdFactory.getByRequest(request)
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}