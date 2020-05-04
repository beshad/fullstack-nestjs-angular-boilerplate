import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from '@app/app-routing.module'
import { AppComponent } from '@app/app.component'
import { AuthModule } from '@app/auth/auth.module'
import { BaseModule } from '@app/base/base.module'
import { AdminModule } from '@app/admin/admin.module'
import { UserModule } from '@app/user/user.module'

import { UserService } from '@app/user/user.service'
import { HomeComponent } from '@app/home/home.component'
import { NbThemeModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'

import { AuthInterceptor } from './auth/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    BaseModule,
    AdminModule,
    UserModule,
    CommonModule,
    AppRoutingModule, // AppRoutingModule must be last.
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
