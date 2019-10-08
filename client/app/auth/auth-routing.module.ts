import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_helpers/auth.guard';

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