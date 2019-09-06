import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'register' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' }
  },
  { path: 'logout', component: LogoutComponent },
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