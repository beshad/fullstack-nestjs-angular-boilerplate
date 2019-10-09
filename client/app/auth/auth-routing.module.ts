import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from '@app/auth/register/register.component';
import { LoginComponent } from '@app/auth/login/login.component';

import { AuthGuard } from '@app/auth/_helpers/auth.guard';

const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'register' }
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'login' }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }