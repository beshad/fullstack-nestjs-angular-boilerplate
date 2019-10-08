import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthModule } from '@app/auth/auth.module';
import { BaseModule } from '@app/base/base.module'; 

import { UserService } from '@app/user/user.service';
import { HomeComponent } from '@app/home/home.component';


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
    CommonModule,
    AppRoutingModule, // AppRoutingModule must be last.
  ],
  providers: [
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
