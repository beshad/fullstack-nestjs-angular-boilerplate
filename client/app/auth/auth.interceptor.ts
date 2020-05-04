import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string

  constructor(
    private nbAuthService: NbAuthService
  ) {
    this.nbAuthService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.token = token.getValue()
      }

    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });

    return next.handle(request);
  }

}