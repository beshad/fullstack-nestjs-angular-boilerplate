import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';
import { AuthGuard } from '@app/auth/auth-guard.service';
import { AuthComponent } from './auth.component';

// nebular auth module
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';

import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbUserModule
} from '@nebular/theme';

export interface NbAuthSocialLink {
  link?: string,
  url?: string,
  target?: string,
  title?: string,
  icon?: string,
}

const socialLinks: NbAuthSocialLink[] = [];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken
          },
          baseEndpoint: 'api',
          login: {
            endpoint: '/users/login',
            method: 'post',
          },
          register: {
            endpoint: '/users/register',
            method: 'post',
          },
          logout: {
            endpoint: '/users/sign-out',
            method: 'post',
          },
          requestPass: {
            endpoint: '/users/request-pass',
            method: 'post',
          },
          resetPass: {
            endpoint: '/users/reset-pass',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 2000, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          socialLinks: socialLinks, // social links at the bottom of a page
          redirect: {
            success: '/home/',
            failure: null, // stay on the same page
          },
        },
        register: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          terms: true,
          socialLinks: socialLinks,
          redirect: {
            success: '/login/',
            failure: null, // stay on the same page
          },
        },
        requestPassword: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          socialLinks: socialLinks,
        },
        resetPassword: {
          redirectDelay: 500,
          strategy: 'email',
          showMessages: {
            success: true,
            error: true,
          },
          socialLinks: socialLinks,
        },
        logout: {
          redirectDelay: 500,
          strategy: 'email',
        },
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          email: {
            required: true,
          }
        },
      },
    }),
  ],
  providers: [
    AuthGuard
  ],
})

export class AuthModule { }